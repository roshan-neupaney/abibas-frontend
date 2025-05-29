import React from "react";
import ProfilePage from "./detail";
import { authorization } from "../../../hoc/auth";
import { cookies } from "next/headers";
import { ServerSideGet } from "@/utilities/apiCalls";
import { GET_MY_DETAIL } from "../../../config/endpoints";
import { FormatDate } from "@/utilities/helper";

async function getData(token: string) {
  authorization(token);
  try {
    const response = [await ServerSideGet(token, GET_MY_DETAIL)];
    const [userDetail] = response;
    return { userDetail };
  } catch (error) {
    console.error(error);
  }
}

const Profile = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { userDetail }: any = await getData(token) || '';
  console.log("userDetail", userDetail);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="px-8 py-8 mt-10 mb-5 bg-[#ECEFF1] greeting-card relative">
          <span
            className="text-lg uppercase "
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            HI, {userDetail?.data?.firstName || ""}
          </span>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">ACCOUNT SUMMARY</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                {userDetail?.data?.firstName?.charAt(0)}
                {userDetail?.data?.lastName?.charAt(0)}
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold">
                {userDetail?.data?.firstName} {userDetail?.data?.lastName}
              </p>
              <p className="text-gray-600 text-sm">{userDetail?.data?.email}</p>
              <p className="text-gray-600 text-sm">
                {userDetail?.data?.mobile}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Member since {FormatDate(userDetail?.data?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details */}
        <div className="md:col-span-2">
          <ProfilePage userDetail={userDetail?.data} token={token} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
