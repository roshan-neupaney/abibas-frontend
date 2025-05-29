import { redirect } from "next/navigation";
import { DecodeJWT } from "../src/utilities/helper";

export const authorizationClient = (value: string | undefined) => {
  
  if (!value) {
    return false;
  } else {
    const decodeToken = DecodeJWT(value);
    const expiryDate = decodeToken.exp * 1000;
    const is_expired = Date.now() > expiryDate;
    if (is_expired) {
      // Redirect to login page
      return false;
    }
  }
  return true;
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


