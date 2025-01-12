import { DELETE, LOGIN_POST, PATCH, POST, SERVER_SIDE_GET } from "../../config/methods";

export const Login_Post = async (url:string, payload: Record<string,any>) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await LOGIN_POST(url, payload);
    const { status, data } = res;
    console.log("res", res, status)
    if (status == 200 || status == 201) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

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
export const ServerSideGetWithParams = async (token: string | undefined, url: string, params: string) => {
    const response = {
      status: false,
      data: {}
    };
  
    try {
      const URL = url+ '?' + params;
      const res = await SERVER_SIDE_GET(URL, token);
      console.log(res)
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

  export const JsonPost = async (url:string, payload: Record<string, any>, token: string) => {
    try {
      const response = {
        data: {},
        status: false,
        statusCode: ''
      };
      const res = await POST(url, payload, token);
      const { status, data } = res;
      if (status === 201) {
        response.data = data;
        response.status = true;
        response.statusCode = status;
      } else {
        response.data = data.message;
        response.status = false;
        response.statusCode = status;
      }
      return response;
    } catch (e) {
      console.error(e);
    }
  };
  export const JsonPatch = async (url: string, id: string, payload: Record<string, any>, token: string) => {
    try {
      const response = {
        data: "",
        status: false,
      };
      const URL = url + "/" + id;
      const res = await PATCH(URL, payload, token);
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

  export const DeleteWithId = async (url: string, id: string, token: string | undefined) => {
    try {
      const response = {
        data: "",
        status: false,
      };
      const URL = url + "/" + id;
      const res = await DELETE(URL, token);
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