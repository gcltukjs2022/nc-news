import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import Button from "react-bootstrap/Button";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import QueriesDropdown from "./QueriesDropdown";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState({ query: "", order: "" });
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    setIsLoading(true);
    getArticles(queries).then(({ articles }) => {
      setArticles(articles);
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
      <h2>All Articles</h2>
      <QueriesDropdown
        queries={queries}
        setQueries={setQueries}
        setSearchParams={setSearchParams}
      />
      {articles.map((article) => {
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
