import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading } = useLoadUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isSuccess, error },
  ] = useUpdateUserMutation();
  console.log(data);
  // const isLoading = true;

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Profile updated");
    }
    if (error) {
      toast.error(error.message || "updated failed to profile");
    }
  }, [error, data, isSuccess]);

  if (isLoading) {
    return <h1>Profile is Loading....</h1>;
  }

  const { user } = data;

  const onImageChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const handleProfileChange = async () => {
    // console.log(name, profilePhoto);
    const formData = new FormData();
    formData.append("name", name);
    console.log(name);
    console.log(profilePhoto);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  // const enrolledCourses = [1]; // this is static so no need now
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col items-center ">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mt-4">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="mb-4 ml-4">
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            Name:
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-4">
              {user.name}
            </span>
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            Email:
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-4">
              {user.email}
            </span>
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            Role:
            <span className="font-normal text-gray-700 dark:text-gray-300 ml-4">
              {user.role.toUpperCase()}
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes your profile here. Click save when you are done
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onImageChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleProfileChange}>
                  <>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin">
                        Please wait
                      </Loader2>
                    ) : (
                      "Save Changes"
                    )}
                  </>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
