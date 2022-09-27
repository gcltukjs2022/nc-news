import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlebyId, getUserByUsername, updateArticle } from "../utils/api";

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

  const upVotesArticle = () => {
    setSingleArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
    const reqBody = {
      inc_votes: 1,
    };
    updateArticle(singleArticle.article_id, reqBody)
      .then(() => {})
      .catch((err) => {
        setSingleArticle((currArticle) => {
          return { ...currArticle, votes: currArticle.votes - 1 };
        });
      });
  };

  const downVotesArticle = () => {
    setSingleArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes - 1 };
    });
    const reqBody = {
      inc_votes: -1,
    };
    updateArticle(singleArticle.article_id, reqBody)
      .then(() => {})
      .catch((err) => {
        setSingleArticle((currArticle) => {
          return { ...currArticle, votes: currArticle.votes + 1 };
        });
      });
  };

  return (
    <div className="card--article">
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.created_at}</p>
      <p>Posted by {singleArticle.author}</p>
      <img className="user--avatar" src={user.avatar_url} alt={user.username} />
      <p>{singleArticle.body}</p>
      <p>Votes:{singleArticle.votes}</p>
      <button
        onClick={() => {
          upVotesArticle();
        }}
      >
        <span>👍</span>
      </button>
      <button
        onClick={() => {
          downVotesArticle();
        }}
      >
        <span>👎</span>
      </button>
      <hr />
    </div>
  );
}
