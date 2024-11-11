import { SERVER_SIDE_GET } from "../../config/methods";

export const ServerSideGet = async (token: string, url: string) => {
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