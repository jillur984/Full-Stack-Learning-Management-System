import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl tranform hover:scale-105 transition-all duration-300 ">
      <div className="relative">
        <img
          src="https://imgs.search.brave.com/lkB30F6ObDCeYXkObNJjo_XU9LDxSnUX9h5jql5bWv4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM2Yx/aXlmeHh6OGkxZS5j/bG91ZGZyb250Lm5l/dC9jb3Vyc2VzL2Nv/dXJzZV9pbWFnZS8z/NjZlNjViMTNlYTAu/anBn"
          alt="nextjs"
          srcset=""
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className={"px-3 py-2"}>
        <h1 className="hover:underline font-bold text-lg truncate">
          Next JS course in Bangla 2025
        </h1>
        <div className="flex items-center gap-3 mt-2 ">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm truncate">
            Jillur Rahman Mernstack
          </h1>
          <div>
            <Badge
              className={
                "bg-blue-600 text-white px-2 py-1 text-xs justify-items-end rounded-full"
              }
            >
              Advanced
            </Badge>
          </div>
        </div>
        <div className="font-bold text-lg mt-1">
          <span>$100</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
