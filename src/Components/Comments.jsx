import { useContext, useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { getComments, removeComment } from "../utils/api";
import CommentAdder from "./CommentAdder";
import { UserContext } from "./User";
import Users from "./Users";

export default function Comments({ article_id }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [comments]);

  const handleDeleteComment = (event, comment_id) => {
    event.preventDefault();
    alert("You have deleted a comment!");

    const newCommentsList = comments.filter((comment) => {
      return comment.comment_id !== comment_id;
    });

    setComments(newCommentsList);

    removeComment(comment_id)
      .then(() => {})
      .catch((err) => {
        alert("Error: Please try to delete again.");
        setComments(comments);
      });
  };

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <>
      <CommentAdder article_id={article_id} setComments={setComments} />
      <div>
        {comments.map((comment) => {
          return (
            <Card key={comment.comment_id} className="card--comments">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Users author={comment.author} />
                  {comment.author}
                  <br />
                  {comment.created_at}
                </ListGroup.Item>
                <ListGroup.Item>votes:{comment.votes}</ListGroup.Item>
                <ListGroup.Item>{comment.body}</ListGroup.Item>

                {comment.author === loggedInUser.username ? (
                  <ListGroup.Item>
                    <button
                      className="button--delete comment"
                      onClick={(event) =>
                        handleDeleteComment(event, comment.comment_id)
                      }
                    >
                      Delete
                    </button>
                  </ListGroup.Item>
                ) : (
                  ""
                )}
              </ListGroup>
            </Card>
          );
        })}
      </div>
    </>
  );
}
