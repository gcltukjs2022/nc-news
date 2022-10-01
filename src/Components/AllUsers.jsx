import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "./UserProvider";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then(({ users }) => {
      setAllUsers(users);
    });
  }, [allUsers]);

  useEffect(() => {
    const storage = localStorage.getItem("loggedInUser");
    if (storage) {
      setLoggedInUser(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {});

  const handleLogin = (event, user) => {
    event.preventDefault();
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
  };

  return (
    <div className="users">
      <h2>Users</h2>
      <div className="container--users">
        {allUsers.map((user) => {
          return (
            <div key={user.username} className="users--card">
              <div className="text">
                <img src={user.avatar_url} alt="user-avatar" width={80} />
                <hr />

                {user.username === loggedInUser.username ? (
                  <p className="loggedin-user">{user.name}</p>
                ) : (
                  <p>{user.name}</p>
                )}
                {user.username === loggedInUser.username ? (
                  <p className="loggedin-user">{user.username}</p>
                ) : (
                  <p>{user.username}</p>
                )}
                {user.username === loggedInUser.username ? (
                  <p className="loggedin-user">(You)</p>
                ) : (
                  <p> </p>
                )}
                <button onClick={(event) => handleLogin(event, user)}>
                  Login
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
