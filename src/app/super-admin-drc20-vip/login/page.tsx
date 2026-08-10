import { LoginForm } from "@/src/components/auth/LoginForm";

export default function SuperAdminLoginPage() {
  return (
    <LoginForm
      heading="Super Admin Sign In"
      subheading="Full system access."
      allowedRole="super_admin"
      redirectTo="/dashboard"
    />
  );
}