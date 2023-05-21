import request  from "@/util/request";

function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

function getInfo(token) {
  return request({
    url: "/auth/info",
    method: "get",
    params: { token },
  });
}

function logout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

function register(data) {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
}


export {
    login,
    getInfo,
    logout,
    register,
}