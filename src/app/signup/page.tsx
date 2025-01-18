import SignUp from "./signup";

const SignUpPage = async () => {
  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc] fixed top-0 z-10">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="text-4xl tracking-[2px] uppercase" style={{ fontFamily: "var(--font-adineue)" }}>Sign Up</span>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
