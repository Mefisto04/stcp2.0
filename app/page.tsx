import React from "react";
import LeaderboardUI from "@/components/LeaderboardUI";
import { Navbar } from "@/components/Navbar";

const page = () => {
  return (
    <>
      <div className="bg h-screen">
        <Navbar />
        <LeaderboardUI />
      </div>
    </>
  );
};
export default page;
