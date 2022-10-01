import { useEffect, useState } from "react";
import { getUserByUsername } from "../utils/api";

export default function UserAvatar({ author }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(author).then(({ user }) => {
      setUser(user);
    });
  }, [author]);

  return (
    <div>
      <img src={user.avatar_url} alt={user.username} width={40} />
    </div>
  );
}
