"use client";

import CustomInput from "@/subcomponents/input";
import { updateState } from "@/utilities/helper";
import RightArrowIcon from "../../../public/icon/right-arrow-white.svg";
import { useState } from "react";
import { CRUD_USER_EDIT } from "../../../config/endpoints";
import { JsonPatch } from "@/utilities/apiCalls";
import toast from "react-hot-toast";
import useStore from "../../../zustand/store";
import { useRouter } from "next/navigation";
import { Button, ButtonWithShadow } from "@/subcomponents/button";

interface userDetailType {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  status: string;
  image_name: string | null;
}

interface ProfileDetailProps {
  userDetail: userDetailType;
  token: string;
}

const ProfilePage = ({ userDetail, token }: ProfileDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userDetail?.firstName,
    lastName: userDetail?.lastName,
    email: userDetail?.email,
    mobile: userDetail?.mobile,
  });
  const { toggleLoginModalTrue } = useStore();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await JsonPatch(CRUD_USER_EDIT, "", formData, token);
      const { status, statusCode }: any = res;
      if (status) {
        toast.success("Profile edited successfully");
        setIsEditing(false);
        setLoading(false);
        router.refresh();
      } else if (statusCode === 401) {
        toggleLoginModalTrue();
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Error while editing profile");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">PERSONAL INFORMATION</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm underline"
          >
            EDIT
          </button>
        )}
      </div>

      {isEditing ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CustomInput
              title="First Name"
              value={formData.firstName}
              onChange={(val: string) =>
                updateState("firstName", val, setFormData)
              }
            />
            <CustomInput
              title="Last Name"
              value={formData.lastName}
              onChange={(val: string) =>
                updateState("lastName", val, setFormData)
              }
            />
            <CustomInput
              title="Email"
              value={formData.email}
              onChange={(val: string) => updateState("email", val, setFormData)}
            />
            <CustomInput
              title="Mobile"
              value={formData.mobile}
              onChange={(val: string) =>
                updateState("mobile", val, setFormData)
              }
            />
          </div>
          <div className="flex gap-6 ">
            <ButtonWithShadow
              title="Submit"
              sideIcon={RightArrowIcon}
              iconHeight={40}
              iconWidth={30}
              className="mt-8 !max-w-fit"
              disabled={loading}
              onClick={handleSubmit}
            />
            <Button
              title="Cancle"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  firstName: userDetail.firstName,
                  lastName: userDetail.lastName,
                  email: userDetail.email,
                  mobile: userDetail.mobile,
                });
              }}
              className="border border-black h-12 mt-8 px-4 items-center font-medium hover:bg-gray-100"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            <p className="font-medium">{userDetail.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            <p className="font-medium">{userDetail.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{userDetail.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Mobile</p>
            <p className="font-medium">{userDetail.mobile}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
