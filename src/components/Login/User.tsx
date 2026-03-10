import { startTransition } from "react";


export function User({
  user, setUser,
}: {
  user: User;
  setUser: (credentials: Credentials | null) => void;
}) {
  function handleLogout() {
    startTransition(() => setUser(null));
  }
  return (
    <>
      <div>Welcome back, {user.username}</div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
