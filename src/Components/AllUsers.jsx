import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "./User";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then(({ users }) => {
      setAllUsers(users);
    });
  }, [allUsers]);

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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
