import { cookies } from "next/headers";
import Login from "./login";

const LoginPage = async () => {
  const setCookies = async (data: any) => {
    "use server";
    cookies().set({
      name: "access_token",
      value: "Bearer " + data.access_token,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc]">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="text-4xl tracking-[2px] uppercase" style={{ fontFamily: "var(--font-adineue)" }}>Sign In</span>
        </div>
        <Login setCookies={setCookies} />
      </div>
    </div>
  );
};

export default LoginPage;
