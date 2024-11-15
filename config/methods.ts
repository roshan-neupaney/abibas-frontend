import axios from "axios";
import { BASE_URL } from "./constants";

export const SERVER_SIDE_GET = async (url: string, token: string | undefined) => {
    return await axios
      .get(BASE_URL + url, { headers: { Authorization: token } })
      .then((res) => {
        return res;
      });
  };