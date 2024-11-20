import axios from "axios";
import { BASE_URL } from "./constants";

export const LOGIN_POST = async (url: string, payload: Record<string, any>) => {
  try {
    return await axios.post(BASE_URL + url, payload).then((res) => {
      return res;
    });
  } catch (e:any) {
    return e.response;
  }
};

export const SERVER_SIDE_GET = async (url: string, token: string | undefined) => {
    return await axios
      .get(BASE_URL + url, { headers: { Authorization: token } })
      .then((res) => {
        return res;
      });
  };

  export const POST = async (url: string, payload:any, token:string) => {
    try {
      return await axios
        .post(BASE_URL + url, payload, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          return res;
        });
    } catch (e:any) {
      return e.response;
    }
  };
  export const PATCH = async (url: string, payload:any, token:string) => {
    try {
      return await axios
        .patch(BASE_URL + url, payload, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          return res;
        });
    } catch (e:any) {
      return e.response;
    }
  };