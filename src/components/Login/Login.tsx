import { useActionState } from "react";
import { LoginForm } from "./LoginForm";
import { User } from "./User";

async function fetchUser(
  user: User | null,
  credentials: Credentials | null,
): Promise<User | null> {
  console.log(user, credentials);
  if (credentials == null) {
    return null;
  }
  console.log("####: 6 sec await");
  await new Promise((resolve) => setTimeout(resolve, 6000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json() as Promise<User>;
}

export default function Login() {
  const [user, dispatchAction] = useActionState<
    User | null,
    Credentials | null
  >(fetchUser, null);

  if (user) {
    return <User user={user} setUser={dispatchAction} />;
  }

  return <LoginForm setUser={dispatchAction} />;
}
