import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="flex items-center justify-center  sm:mx-[100px] md:mx-[300px] lg:mx-[600px] min-h-screen">
      {children}
    </div>
  );
};
