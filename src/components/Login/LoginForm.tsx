import { startTransition, useRef } from "react";
import "./login-form.css";
import { Field } from "./Field";
import { SubmitButton } from "../SubmitButton";

export function LoginForm({
  setUser,
}: {
  setUser: (credentials: Credentials | null) => void;
}) {
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function loginAction(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const value = emailField.current?.value;
    const pwd = passwordField.current?.value;

    if (value == null || !isValidEmail(value)) {
      alert("Invalid email");
      return;
    }
    if (pwd == null || pwd.length < 6) {
      alert("Invalid password");
      return;
    }
    startTransition(() => {
      setUser({ email: value, password: pwd });
    });
  }

  return (
    <form onSubmit={loginAction}>
      <Field label="email" type="email" ref={emailField} />
      <Field label="password" type="password" ref={passwordField} />
      <SubmitButton />
    </form>
  );
}


