import request from "@/util/request";

function getRoles() {
  return request({
    url: "/infos/roles",
    method: "get",
  });
}

function getSections() {
  return request({
    url: "/infos/sections",
    method: "get",
  });
}

function getAllDepartment() {
  return request({
    url: "/infos/all/department",
    method: "get",
  });
}

function getDepartmentDetail(data) {
  return request({
    url: "/infos/department/detail",
    method: "get",
    params: data,
  });
}

export function newPost(data) {
  return request({
    url: "/post/new",
    method: "post",
    data,
  });
}

export function postList() {
  return request({
    url: "/post/list",
    method: "get",
  });
}

export function postDetail(pid) {
  return request({
    url: "/post/detail/" + pid,
    method: "get",
  });
}

export function userInfo(uid) {
  return request({
    url: "/infos/user/" + uid,
    method: "get",
  });
}

export function searchArticle(params) {
  return request({
    url: "/search/article",
    method: "get",
    params,
  });
}
export function searchDoctor(params) {
  return request({
    url: "/search/doctor",
    method: "get",
    params,
  });
}
export { getRoles, getSections, getAllDepartment, getDepartmentDetail };
