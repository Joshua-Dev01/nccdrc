import { LoginForm } from "@/src/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <LoginForm
      heading="Admin Sign In"
      subheading="For NCC-DRC staff and content administrators."
      allowedRole="admin"
      redirectTo="/dashboard"
    />
  );
}