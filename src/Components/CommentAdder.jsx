import { useContext, useState } from "react";
import { addComment } from "../utils/api";
import { UserContext } from "./User";

export default function CommentAdder({ article_id, setComments }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: loggedInUser.username,
    body: "",
  });

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(article_id, newComment).then(({ comment }) => {
      setComments((currComments) => {
        return [...currComments, comment];
      });
    });
    setNewComment({ username: loggedInUser.username, body: "" });
  };

  return (
    <div>
      <form className="form--comment" onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="body"
          value={newComment.body}
          placeholder="Comment here"
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
