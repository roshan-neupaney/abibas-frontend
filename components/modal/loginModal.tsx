"use client";
import Image from "next/image";
import crossIcon from "../../public/icon/cross.svg";
import CustomInput from "@/subcomponents/input";
import { useState } from "react";
import { updateState } from "@/utilities/helper";
import { ButtonWithShadow } from "@/subcomponents/button";
import RightArrow from "../../public/icon/right-arrow-white.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Login_Post } from "@/utilities/apiCalls";
import { loginValidation, signupValidation } from "@/utilities/validation";
import { LOGIN, SIGNUP } from "../../config/endpoints";

interface LoginModalProps {
  open: boolean;
  handleClose: any;
  setCookies: (val: string) => void;
}

const defaultForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  mobile: "",
};

const defaultError = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  mobile: "",
};

const LoginModal = ({ open, handleClose, setCookies }: LoginModalProps) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  const beautifyLoginPayload = () => {
    const payload = {
      email: "",
      password: "",
    };
    payload.email = formData.email;
    payload.password = formData.password;
    return payload;
  };
  const beautifySignupPayload = () => {
    const payload = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
      role: "USER",
    };
    payload.email = formData.email;
    payload.password = formData.password;
    payload.firstName = formData.firstName;
    payload.lastName = formData.lastName;
    payload.mobile = formData.mobile;
    return payload;
  };
  const handleSubmit = async () => {
    try {
      const beautifiedPayload = isLogin
        ? beautifyLoginPayload()
        : beautifySignupPayload();
      const { isValid, error }: any = isLogin
        ? loginValidation(beautifiedPayload)
        : signupValidation(beautifiedPayload);
      if (isValid) {
        const response = isLogin
          ? await Login_Post(LOGIN, beautifiedPayload)
          : await Login_Post(SIGNUP, beautifiedPayload);
        const { status, data }: any = response;
        if (status) {
          if (isLogin) {
            setCookies(data?.access_token);
            toast.success("Login Successful");
            handleClose();
            router.refresh();
          } else {
            setIsLogin(true);
            toast.success("Sign up Successful");
            setFormData(defaultForm);
            setFormError(defaultError);
          }
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Login Unsuccessful");
      console.error(e);
    }
  };
  return (
    <>
      {open && (
        <div className="flex fixed top-0 left-0 w-full h-full justify-center items-center gap-2 bg-[#000000a3] z-50">
          <div className="flex flex-1 relative media-960:max-w-[450px] max-w-72 max-h-[80vh] flex-col bg-[#f9f7f7] shadow-2xl p-0 md:p-5">
            <div
              className="flex justify-center items-center absolute h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-[#ffffff] md:-right-6 md:-top-6 -right-4 -top-4 border border-black"
              onClick={handleClose}
            >
              <Image src={crossIcon} height={30} width={30} alt="" />
            </div>

            <div className="flex py-3 px-5 gap-4 items-center self-stretch border-b border-solid border-[#D8DADB]">
              <div
                className="flex flex-1 text-3xl uppercase"
                style={{ fontFamily: "var(--font-adineue)" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </div>
            </div>
            {isLogin ? (
              <div className="flex flex-col py-4 px-5 gap-4">
                <CustomInput
                  title="Email"
                  value={formData.email}
                  onChange={(val: string) =>
                    updateState("email", val, setFormData)
                  }
                  placeholder="Email Address*"
                  error={formError.email}
                />
                <CustomInput
                  title="Password"
                  value={formData.password}
                  onChange={(val: string) =>
                    updateState("password", val, setFormData)
                  }
                  placeholder="Password*"
                  type="password"
                  error={formError.password}
                />
                <div className="flex gap-4 items-end">
                  <div className="">
                    <ButtonWithShadow
                      title="Continue"
                      onClick={handleSubmit}
                      sideIcon={RightArrow}
                      className=""
                    />
                  </div>
                  <span
                    className="uppercase underline cursor-pointer"
                    onClick={() => {
                      setIsLogin(false);
                      setFormData(defaultForm);
                      setFormError(defaultError);
                    }}
                  >
                    Sign Up
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col py-4 px-5 gap-4 !h-full overflow-auto border noScrollBar">
                <CustomInput
                  title="Firstname"
                  value={formData.firstName}
                  onChange={(val: string) =>
                    updateState("firstName", val, setFormData)
                  }
                  placeholder="Firstname*"
                  error={formError.firstName}
                />
                <CustomInput
                  title="Lastname"
                  value={formData.lastName}
                  onChange={(val: string) =>
                    updateState("lastName", val, setFormData)
                  }
                  placeholder="Lastname*"
                  error={formError.lastName}
                />
                <CustomInput
                  title="Email"
                  value={formData.email}
                  onChange={(val: string) =>
                    updateState("email", val, setFormData)
                  }
                  placeholder="Email Address*"
                  error={formError.email}
                />
                <CustomInput
                  title="Password"
                  value={formData.password}
                  onChange={(val: string) =>
                    updateState("password", val, setFormData)
                  }
                  placeholder="Password*"
                  type="password"
                  error={formError.password}
                />
                <CustomInput
                  title="Mobile"
                  value={formData.mobile}
                  onChange={(val: string) =>
                    updateState("mobile", val, setFormData)
                  }
                  placeholder="Mobile*"
                  error={formError.mobile}
                />
                <div className="flex gap-4 items-end">
                  <div className="">
                    <ButtonWithShadow
                      title="Continue"
                      onClick={handleSubmit}
                      sideIcon={RightArrow}
                      className=""
                    />
                  </div>
                  <span
                    className="uppercase underline tracking-[2px] cursor-pointer"
                    onClick={() => {
                      setIsLogin(true);
                      setFormData(defaultForm);
                      setFormError(defaultError);
                    }}
                  >
                    Login
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
