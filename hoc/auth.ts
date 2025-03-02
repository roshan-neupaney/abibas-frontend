import { redirect } from "next/navigation";
import { DecodeJWT } from "../src/utilities/helper";
import useStore from "../zustand/store";

export const authorizationClient = (value: string | undefined) => {
  const { toggleLoginModalTrue } = useStore();
  if (!value) {
    toggleLoginModalTrue();
  } else {
    const decodeToken = DecodeJWT(value);
    const expiryDate = decodeToken.exp * 1000;
    const is_expired = Date.now() > expiryDate;
    if (is_expired) {
      // Redirect to login page
      toggleLoginModalTrue();
    }
  }
};

export const authorization = (value: string | undefined) => {
  if (!value) {
    redirect('/login');
  } else {
    const decodeToken = DecodeJWT(value);
    const expiryDate = decodeToken.exp * 1000;
    const is_expired = Date.now() > expiryDate;
    if (is_expired) {
      // Redirect to login page
      redirect('/login')
    }
  }
};


