import { useEffect, useState } from "react";
import { getUserByUsername } from "../utils/api";

export default function Users({ author }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(author).then(({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <img src={user.avatar_url} alt={user.username} width={30} />
    </div>
  );
}
