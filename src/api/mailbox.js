import request from "../utils/request";

// 获取举报信息

export function getReportList(params) {
  return request({
    url: "/report_box/getlist",
    method: "post",
    data: params // 使用data字段发送请求参数
  });
}

// 举报审核通过/封禁

export function confirmReportMessage(reportId) {
  const data = { article_id: reportId };
  return request({
    url: "/report_box/ack",
    method: "post",
    data
  });
}
