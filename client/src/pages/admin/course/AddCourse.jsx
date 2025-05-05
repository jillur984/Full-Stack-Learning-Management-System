import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>

      <div className="space-y-4">
        <Label className="space-y-2 mb-2">Title</Label>
        <Input type="text" placeholder="Your Course Name" />
      </div>
      <div>
        <Label className="mt-2 mb-2">Category</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Next JS">Next JS</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Frontend Development">
                Frontend Development
              </SelectItem>
              <SelectItem value="Fullstack Development">
                Fullstack Development
              </SelectItem>
              <SelectItem value="MERN Stack Development">
                MERN Stack Development
              </SelectItem>
              <SelectItem value="Javascript">Javascript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="MongoDB">MongoDB</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 gap-2 flex ">
        <Button>Cancel</Button>
        <Button onClick={() => navigate("/admin/course")}>Create</Button>
      </div>
    </div>
  );
};

export default AddCourse;
