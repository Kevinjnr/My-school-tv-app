import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3300",
});
request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    console.log("Error during request: ", error);
  }
);
request.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (error) => {
    if (error.status == 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export async function post(url, body, headers) {
  try {
    const resp = await request.post(url, body, {
      headers: headers,
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
}
export async function patch(url, body, headers) {
  try {
    const resp = await request.patch(url, body, {
      headers: headers,
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
}
export async function get(url) {
  try {
    const resp = await request.get(url);
    return resp.data;
  } catch (error) {
    throw error;
  }
}
