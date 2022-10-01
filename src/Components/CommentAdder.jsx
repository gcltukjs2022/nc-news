import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { addComment } from "../utils/api";
import { UserContext } from "./UserProvider";

export default function CommentAdder({ article_id, setComments }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: loggedInUser.username,
    body: "",
  });

  const handleChange = (event) => {
    setNewComment({ ...newComment, body: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newComment);
    addComment(article_id, newComment).then(({ comment }) => {
      setComments((currComments) => {
        return [...currComments, comment];
      });
    });
    setNewComment({ username: loggedInUser.username, body: "" });
  };

  return (
    <div className="comment--adder">
      <form className="form--comment" onSubmit={handleSubmit}>
        <div className="input--form">
          <div className="mb-3 row">
            <div className="col-sm-10">
              <input
                onChange={handleChange}
                id="inputComment"
                type="text"
                className="form-control"
                name="body"
                value={newComment.body}
                placeholder="Write your comment here"
                required
              />
            </div>
          </div>
        </div>

        <div className="btn--form">
          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
