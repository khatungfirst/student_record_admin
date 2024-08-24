import request from "../utils/request";

// 获取老师列表
export function getTeacherList(params) {
  return request({
    url: "/teacherManage/queryTeacher",
    method: "post",
    data: params
  });
}

// 添加单个老师
export function addSingleTeacher(data) {
  return request({
    url: "/teacherManage/addSingleTeacher",
    method: "post",
    data
  });
}

// 添加多个老师
export function addMultipleTeacher(data) {
  return request({
    url: "/teacherManage/addMultipleTeacher",
    method: "post",
    data
  });
}

// 删除单个老师
export function deleteTeacher(username) {
  const data = { username: username };
  return request({
    url: "/teacherManage/deleteTeacher",
    method: "post",
    data
  });
}

// 删除多个老师
// export function deleteMultipleTeacher(data) {
//   return request({
//     url: "/teacherManage/deleteMultipleTeacher",
//     method: "post",
//     data
//   });
// }
export const deleteMultipleTeacher = (username) => {
  return request.post(
    "/teacherManage/deleteMultipleTeacher",
    JSON.stringify(username)
  );
}

// 封禁老师
export function banTeacher(username) {
  const data = { username: username };
  return request({
    url: "/teacherManage/banTeacher",
    method: "post",
    data
  });
}

// 获取老师学号
export function getUsername(data) {
  // console.log(username,'=============');
  //  const data = {username:username};
  return request({
    url: "/teacherManage/getUsername",
    method: "post",
    data
  });
}

// 编辑老师信息
export function editTeacher(data) {
  return request({
    url: "/teacherManage/editTeacher",
    method: "post",
    data
  });
}

// 设为管理员
export function setTeacherManager(data) {
  return request({
    url: "/teacherManage/setTeacherManager",
    method: "post",
    data
  });
}

// 批量导出
export function outputMultipleTeacher(data) {
  return request({
    url: "/teacherManage/outputMultipleTeacher",
    method: "post",
    data
  });
}
