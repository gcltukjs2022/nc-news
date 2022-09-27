import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-solo-project.herokuapp.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data;
  });
};
