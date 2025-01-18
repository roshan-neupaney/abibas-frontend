"use client";
import visibleIcon from "../../../public/icon/visible.svg";
import noVisibleIcon from "../../../public/icon/noVisible.svg";
import { updateState } from "../../utilities/helper";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signupValidation } from "../../utilities/validation";
import { Login_Post } from "@/utilities/apiCalls";
import { SIGNUP } from "../../../config/endpoints";
import CustomInput from "@/subcomponents/input";
import { Button } from "@/subcomponents/button";
import Link from "next/link";

const defaultForm = {
  firstName: "",
  lastName: "",
  mobile: "",
  role: "SUPERADMIN",
  email: "",
  password: "",
};

const defaultError = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(defaultError);
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleClick = async () => {
    setLoading(true)
    try {
      const { isValid, error }: any = signupValidation(formData);
      if (isValid) {
        const response = await Login_Post(SIGNUP, formData);
        const { status, data }: any = response;
        if (status) {
          toast.success("Signed Up Successfully");
          router.push("/login");
          router.refresh();
          setLoading(false)
        } else {
          toast.error(data.message);
          setLoading(false)
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
        setLoading(false)
      }
    } catch (e) {
      toast.error("Login Unsuccessful");
      console.error(e)
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col self-stretch gap-6">
      <CustomInput
        title="Firstname"
        value={formData.firstName}
        onChange={(val: string) =>
          updateState("firstName", val, setFormData, setFormError)
        }
        error={formError.firstName}
        placeholder="Enter firstname"
        required
      />
      <CustomInput
        title="Lastname"
        value={formData.lastName}
        onChange={(val: string) =>
          updateState("lastName", val, setFormData, setFormError)
        }
        placeholder="Enter lastname"
        error={formError.lastName}
        required
      />
      <CustomInput
        title="Mobile"
        value={formData.mobile}
        placeholder="Ex. 9800000000"
        onChange={(val: string) =>
          updateState("mobile", val, setFormData, setFormError)
        }
        error={formError.mobile}
        required
      />
      <CustomInput
        title="Email"
        value={formData.email}
        onChange={(val: string) =>
          updateState("email", val, setFormData, setFormError)
        }
        error={formError.email}
        required
      />
      <CustomInput
        title="Password"
        value={formData.password}
        onChange={(val: string) =>
          updateState("password", val, setFormData, setFormError)
        }
        type={inputType}
        rightIcon={inputType === "text" ? noVisibleIcon : visibleIcon}
        iconClick={handleInputType}
        error={formError.password}
        required
      />
     <div className="flex items-end gap-4">
        <Button
          title="Sign Up"
          onClick={handleClick}
          disabled={loading}
          className="bg-black h-12 items-center px-4 py-2 rounded text-white uppercase"
        />
        <Link href={"/login"}>
          <div className="tracking-[1px] underline text-lg">Login</div>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
