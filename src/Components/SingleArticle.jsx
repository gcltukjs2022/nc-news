import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getArticlebyId, getUserByUsername, updateArticle } from "../utils/api";
import Comments from "./Comments";

export default function SingleArticle() {
  const params = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getArticlebyId(params.id)
      .then(({ article }) => {
        setSingleArticle(article);
        getUserByUsername(article.author).then(({ user }) => {
          setUser(user);
          setIsLoading(false);
        });
      })
      .catch((err) => navigate(`/articles/${params.id}/article_not_found`));
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

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <div className="card--article">
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.created_at}</p>
      <img
        className="user--avatar"
        src={user.avatar_url}
        alt={user.username}
        width={40}
      />
      <p>Posted by {singleArticle.author}</p>
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
      <p>Comments:</p>
      <Comments article_id={singleArticle.article_id} />
    </div>
  );
}
