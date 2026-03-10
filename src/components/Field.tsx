import { useFormStatus } from "react-dom";

export function Field({ label, type, ref }: { label: string; type: string; ref: React.RefObject<HTMLInputElement | null>; }) {
  const { pending } = useFormStatus();

  return (
    <div className="login-field">
      <label>
        <span>{label}:</span>
        <input ref={ref} type={type} disabled={pending} />
      </label>
    </div>
  );
}
