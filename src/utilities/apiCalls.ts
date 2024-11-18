import { SERVER_SIDE_GET } from "../../config/methods";

export const ServerSideGet = async (token: string | undefined, url: string) => {
    const response = {
      status: false,
      data: {}
    };
  
    try {
      const res = await SERVER_SIDE_GET(url, token);
      if (res?.status === 200) {
        response.status = true;
        response.data = res.data;
      }
    } catch (error) {
      console.error('Error while fetching', error);
    }
    return response;
  };

  export const ServerSideGetWithId = async (token: string | undefined, url: string, id: string) => {
    try {
      const response = {
        data: "",
        status: false,
      };
      const URL = url + "/" + id;
      const res = await SERVER_SIDE_GET(URL, token);
      const { status, data } = res;
      if (status === 200) {
        response.data = data;
        response.status = true;
      } else {
        response.data = data.message;
        response.status = false;
      }
      return response;
    } catch (e) {
      console.error(e);
    }
  };