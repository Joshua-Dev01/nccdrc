import { LoginForm } from "@/src/components/auth/LoginForm";

export default function UserLoginPage() {
  return (
    <LoginForm
      heading="Sign In"
      subheading="Access your NCC-DRC account."
      allowedRole="user"
      redirectTo="/"
    />
  );
}