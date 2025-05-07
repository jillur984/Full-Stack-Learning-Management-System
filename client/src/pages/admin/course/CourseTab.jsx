import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CourseTab = () => {
  return (
    <div>
      <Card className=" ">
        <CardHeader className="flex  justify-between flex-row">
          <div>
            <CardTitle>Basic course Information</CardTitle>
            <CardDescription>
              Make changes to your courses here. Click save when you're done.
            </CardDescription>
          </div>
          <div className="space-x-2 ">
            <Button variant="outline">Published</Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-5">
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div className="space-y-4 mt-5">
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
