import request from "@/util/request";

export function newMessage(data) {
  return request({
    url: "/message/new",
    method: "post",
    data,
  });
}

export function newContact(data) {
  return request({
    url: "/message/new/contact",
    method: "post",
    data,
  });
}

export function messageList(params) {
  return request({
    url: "/message/list",
    method: "get",
    params,
  });
}

export function payList(params) {
  return request({
    url: "/message/pay/list",
    method: "get",
    params,
  });
}

export function contactList() {
  return request({
    url: "/message/contact/list",
    method: "get",
  });
}

export function uploadImg(data) {
  return request({
    url: "/message/upload/img",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data", // 设置请求头为multipart/form-data，用于文件上传
    },
  });
}
