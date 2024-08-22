import request from "../utils/request";

// 获取角色列表

export function getRoleList(params) {
  return request({
    url: "/role/list",
    method: "get",
    data: params // 使用 data 而不是 params 发送 JSON 请求体
  });
}

// 新增角色

export function addRole(data) {
  return request({
    url: "/role/addRole",
    method: "post",
    data
  });
}

// 更新角色

export function updateRole(data) {
  return request({
    url: `/role/modify/${data.role_id}`,
    method: "put",
    data
  });
}

// 删除角色

export function delRole(role_id) {
  return request({
    url: `/role/delete/${role_id}`,
    method: "delete"
  });
}
