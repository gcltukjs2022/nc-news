import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Dropdown } from "react-bootstrap";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState({ query: "", order: "" });
  const [currentSortAndOrder, setCurrentSortAndOrder] = useState(``);

  useEffect(() => {
    setIsLoading(true);
    getArticles(queries).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [queries]);

  useEffect(() => {
    setCurrentSortAndOrder(
      `Sorted by ${
        queries.query === "votes"
          ? "Votes"
          : queries.query === "comment_count"
          ? "Comments"
          : "Date"
      }
      ${queries.order === "asc" ? "Ascending" : "Descending"}`
    );
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
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Sort by</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "created_at" };
              });
            }}
          >
            Date(Default)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "comment_count" };
              });
            }}
          >
            Comments
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "votes" };
              });
            }}
          >
            Votes
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, order: "DESC" };
              });
            }}
          >
            Descending(Default)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, order: "asc" };
              });
            }}
          >
            Ascending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p>{currentSortAndOrder}</p>
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
