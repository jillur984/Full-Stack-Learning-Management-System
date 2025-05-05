import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "course title and category required",
      });
    }

    const createCourse = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      createCourse,
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
