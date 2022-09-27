import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-solo-project.herokuapp.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data;
  });
};

export const getTopicBySlug = (topic) => {
  return newsApi.get(`/articles?topic=${topic}`).then((res) => {
    return res.data;
  });
};

export const getArticlebyId = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};
