import request from "../utils/request";

// 获取帖子列表
export function getArticleList(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}

// 获取帖子详情
export function getArticleDetail(article_id, username) {
  return request({
    url: "/article/content",
    method: "post",
    data:{
      article_id,
      username
    }
  });
}

// 删除帖子
export function deleteArticle(id) {
  const data = { article_id: id };
  return request({
    url: "/article/delete",
    method: "post",
    data
  });
}

// 封禁帖子
export function articleBan(article_id, article_ban) {
  return request({
    url: "/article/ban",
    method: "post",
    data: {
      article_id,
      article_ban
    }
  });
}

