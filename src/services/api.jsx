import axios from "axios";

const getToken = () => {
  const userData = JSON.parse(localStorage.getItem("astroChatUser"));
  return userData ? userData.token : null;
};

export const AuthApi = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  },
});

export const MessagesApi = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  },
});

export const ChatsApi = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  },
});

export const ContactsApi = axios.create({
  baseURL: "http://localhost:5003",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  },
});

export const NotificationsApi = axios.create({
  baseURL: "http://localhost:5004",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  },
});

const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          !error.config.url.includes("/login")
        ) {
          localStorage.removeItem("astroChatUser");
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(AuthApi);
setupInterceptors(MessagesApi);
setupInterceptors(ContactsApi);
setupInterceptors(ChatsApi);
setupInterceptors(NotificationsApi);
