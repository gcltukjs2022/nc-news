import { useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { getComments } from "../utils/api";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <div>
      {comments.map((comment) => {
        return (
          <Card key={comment.comment_id} className="card--comments">
            <ListGroup variant="flush">
              <ListGroup.Item>
                {comment.author}
                <br />
                {comment.created_at}
              </ListGroup.Item>
              <ListGroup.Item>votes:{comment.votes}</ListGroup.Item>
              <ListGroup.Item>{comment.body}</ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
}
