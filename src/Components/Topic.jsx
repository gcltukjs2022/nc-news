import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getTopicBySlug } from "../utils/api";

export default function Topic() {
  const params = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopicBySlug(params.topic).then(({ articles }) => {
      setTopicArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <div className="cards">
      <h2>{params.topic}</h2>
      {topicArticles.map((article) => {
        return (
          <div key={article.article_id} className="card">
            <div className="text">
              <h5>{article.title}</h5>
              <hr />
              <p>Topic:{article.topic}</p>
              <p>Posted by {article.author}</p>
              <p>{article.created_at}</p>
              <p>Votes:{article.votes}</p>
              <Link to={`/articles/${article.article_id}`}>
                <Button variant="primary">Read Article</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
