import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center mt-20">
      <div className="max-w-3xl mx-auto top-0">
        <h1 className="text-white font-bold text-4xl mb-4 top-0 ">
          Find the best cource for you
        </h1>
        <p className="text-white text-10px mb-3">
          Discover,learn and upskill our wide range of cource
        </p>
        <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <input
            type="text"
            name=""
            id=""
            placeholder="search courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-full h-full gap-0 hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            Search
          </Button>
        </form>
        <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">
          Explore the course
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
