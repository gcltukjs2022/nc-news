import { useContext, useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { getComments, removeComment } from "../utils/api";
import CommentAdder from "./CommentAdder";
import { UserContext } from "./UserProvider";
import UserAvatar from "./UserAvatar";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Comments({ article_id }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then(({ comments }) => {
      const newComments = comments.map((comment) => {
        const time = comment.created_at.slice(0, 16).replace("T", " ");
        comment.created_at = time;
        return comment;
      });
      setComments(newComments);
      setIsLoading(false);
    });
  }, [comments]);

  const handleDeleteComment = (event, comment_id) => {
    event.preventDefault();

    setComments((currComments) => [...currComments]);
    removeComment(comment_id).catch((err) => {
      alert("Error: Please try to delete again.");
      setComments(comments);
    });
  };

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <>
      <CommentAdder article_id={article_id} setComments={setComments} />
      <div>
        <TransitionGroup component="ul">
          {comments.map((comment) => {
            return (
              <CSSTransition
                key={comment.comment_id}
                timeout={700}
                classNames="item"
              >
                <li>
                  <Card key={comment.comment_id} className="card--comments">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <UserAvatar author={comment.author} />
                        {comment.author}
                        <br />
                        {comment.created_at}
                      </ListGroup.Item>
                      <ListGroup.Item>votes:{comment.votes}</ListGroup.Item>
                      <ListGroup.Item>{comment.body}</ListGroup.Item>
                      {comment.author === loggedInUser.username ? (
                        <ListGroup.Item>
                          <Button
                            variant="outline-primary"
                            className="button--delete comment"
                            onClick={(event) =>
                              handleDeleteComment(event, comment.comment_id)
                            }
                          >
                            <ion-icon name="trash-outline"></ion-icon>
                          </Button>
                        </ListGroup.Item>
                      ) : (
                        ""
                      )}
                    </ListGroup>
                  </Card>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </>
  );
}
