"use client";

function ResetPasswordForm() {
  return (
    <form aria-label="Reset password form" className="reset-password-form">
      <h1>Reset Password</h1>

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />

      <button type="submit">Send reset link</button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}