import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlebyId, getUserByUsername } from "../utils/api";

export default function SingleArticle() {
  const params = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    getArticlebyId(params.id).then(({ article }) => {
      setSingleArticle(article);
      getUserByUsername(article.author).then(({ user }) => {
        setUser(user);
      });
    });
  }, [params.id]);

  return (
    <div className="card--article">
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.created_at}</p>
      <p>Posted by {singleArticle.author}</p>
      <img className="user--avatar" src={user.avatar_url} alt={user.username} />
      <p>{singleArticle.body}</p>
      <p>Votes:{singleArticle.votes}</p>
    </div>
  );
}
