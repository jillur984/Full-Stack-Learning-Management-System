import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "course title and category required",
      });
    }

    const courses = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      courses,
      message: "Course created Succefully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;

    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res.status(400).json({
        success: false,
        courses: [],
        message: "Course not found",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    let courseThumbnail;

    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // delete old image
      }

      // upload a thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "course created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to create course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "course not found",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get courseById",
    });
  }
};

export const getPublishCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: false }).populate({
      path: "creator",
      select: "name photoUrl",
    }); // here isPublished i give false for not have true

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get publish course",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      res.status(400).json({
        success: false,
        message: "Lecture title is Required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not Create Lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "lecture not found",
      });
    }

    // update lecture

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;
    await lecture.save();

    // ensure the course still has lecture id if it was not already added
    const course = await Course.findById(courseId);

    if (course && !course.lectures.includes(lectureId)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);

    console.log(lecture);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    // delete the lecture from cloudinary

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    // remove the lecture reference from the associated course

    await Course.updateOne(
      { lectures: lectureId }, // find the course that contains lecture
      { $pull: { lectures: lectureId } } // remove the lecture from lecture array
    );

    return res.status(200).json({
      message: "Lecture removed succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lectures",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};

export const togglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    const course = Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // publish status based on query parametar
    // Convert the string to boolean
    course.isPublished = publish === "true";

    await course.save();
    const statusMessage = course.isPublished ? "published" : "Unpublished";
    return res.status(200).json({
      message: `course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Published Course",
    });
  }
};
