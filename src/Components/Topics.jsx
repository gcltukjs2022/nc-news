import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <main className="">
      <h2>Topics</h2>
      <br />
      {topics.map((topic) => {
        return (
          <div key={topic.slug} className="card--topic">
            <div className="text">
              <h5>{topic.slug}</h5>
              <p>{topic.description}</p>
              <Link to={`/topics/${topic.slug}`}>
                <Button variant="primary">Select Topic</Button>
              </Link>
            </div>
            <hr />
          </div>
        );
      })}
    </main>
  );
}
