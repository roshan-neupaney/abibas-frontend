import React from "react";
import { authorization } from "../../hoc/auth";
import { cookies } from "next/headers";

const LoadingHome = () => {
    const token = cookies().get("access_token")?.value;
  
  authorization(token);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-black animate-progress"></div>
      </div>
    </div>
  );
};

export default LoadingHome;
