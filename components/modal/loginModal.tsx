import Image from "next/image";
import crossIcon from "../../public/icon/cross.svg";
import CustomInput from "@/subcomponents/input";
import { useState } from "react";
import { updateState } from "@/utilities/helper";
import { Button, ButtonWithShadow } from "@/subcomponents/button";
import RightArrow from '../../public/icon/right-arrow-white.svg'
import { Login_Post } from "@/utilities/apiCalls";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LOGIN } from "../../config/endpoints";
import { loginValidation } from "@/utilities/validation";

interface LoginModalProps {
  open: boolean;
  handleClose: any;
  type: string;
  openModal?: any;
  handleDelete?: any;
}

const defaultForm = {
  email: "",
  password: "",
};

const defaultError = {
  email: "",
  password: "",
}

const LoginModal = ({
  open,
  handleClose,
  type,
  handleDelete,
}: LoginModalProps) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError)

  const router = useRouter()
  const handleSubmit = async() => {
    try {
      const { isValid, error }: any = loginValidation(formData);
      if (isValid) {
        const response = await Login_Post(LOGIN, formData);
        const { status, data }: any = response;
        if (status) {
          // setCookies(data);
          toast.success("Login Successful");
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Login Unsuccessful");
    }
  }
  return (
    <>
      {open && (
        <div className="flex fixed top-0 left-0 w-full h-full justify-center items-center gap-2 bg-[#000000a3] z-50">
          <div className="flex flex-1 relative media-960:max-w-[450px] max-h-[80vh] flex-col  bg-[#f9f7f7] shadow-2xl p-5">
            <div className="flex justify-center items-center absolute h-[50px] w-[50px] bg-[#ffffff] -right-6 -top-6 border border-black" onClick={handleClose}>
              <Image src={crossIcon} height={30} width={30} alt="" />
            </div>
            <div className="flex py-3 px-5 gap-4 items-center self-stretch border-b border-solid border-[#D8DADB]">
              <div
                className="flex flex-1 text-3xl uppercase"
                style={{ fontFamily: "var(--font-adineue)" }}
              >
                Login
              </div>
            </div>
            <div className="flex flex-col py-4 px-5 gap-4">
              <CustomInput
                title="Email"
                value={formData.email}
                onChange={(val: string) =>
                  updateState("email", val, setFormData)
                }
                placeholder="Email Address*"
              />
              <CustomInput
                title="Password"
                value={formData.password}
                onChange={(val: string) =>
                  updateState("password", val, setFormData)
                }
                placeholder="Password*"
                type="password"
              />
              <div className="">
                <ButtonWithShadow
                  title="Continue"
                  onClick={handleDelete}
                  sideIcon={RightArrow}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
