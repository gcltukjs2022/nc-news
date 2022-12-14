import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getArticles } from "../utils/api";
import QueriesDropdown from "./QueriesDropdown";

export default function Topic() {
  const params = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState({
    topic: params.topic,
    query: "",
    order: "",
  });
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();

  useEffect(() => {
    getArticles(params)
      .then(({ articles }) => setTopicArticles(articles))
      .catch((err) => navigate(`/topics/${params.topic}/topic_not_found`));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getArticles(queries).then(({ articles }) => {
      setTopicArticles(
        articles.filter((article) => article.topic === params.topic)
      );
      setIsLoading(false);
    });
  }, [queries]);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <div className="cards">
      <h2>{params.topic}</h2>
      <br />
      <QueriesDropdown
        queries={queries}
        setQueries={setQueries}
        setSearchParams={setSearchParams}
      />
      <br />
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
              <p>Comments:{article.comment_count}</p>
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
