import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TextButton from "../../components/buttons/TextButton";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.ts";
import type { AppDispatch } from "../../store/store.ts";
import type { LoginRequest } from "../../store/authSlice.ts";

type ApiIssue = { path?: string[]; message?: string };
type ApiErrorResponse = {
  errors?: ApiIssue[];
  message?: string | string[];
  error?: string;
};

function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setFieldErrors({});
    setLoading(true);

    const isEmail = identifier.includes("@");
    const trimmedIdentifier = identifier.trim();
    const payload = {
      password: password.trim(),
      ...(isEmail ? { email: trimmedIdentifier } : { name: trimmedIdentifier }),
    };

    try {
      await dispatch(login(payload as LoginRequest)).unwrap();
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);

      const respData = axios.isAxiosError(err)
        ? (err.response?.data as ApiErrorResponse | undefined)
        : undefined;

      if (respData) {
        if (Array.isArray(respData.errors) && respData.errors.length) {
          const fe: Record<string, string[]> = {};
          respData.errors.forEach((issue: ApiIssue) => {
            const key = (issue.path && issue.path[0]) || "form";
            fe[key] = fe[key] || [];
            fe[key].push(issue.message || String(issue));
          });
          setFieldErrors(fe);
          setErrors(Object.values(fe).flat());
          return;
        }

        if (respData.message) {
          if (typeof respData.message === "string")
            setErrors([respData.message]);
          else if (Array.isArray(respData.message)) setErrors(respData.message);
          else setErrors([JSON.stringify(respData.message)]);
          return;
        }

        if (respData.error) {
          setErrors([String(respData.error)]);
          return;
        }
      }

      if (axios.isAxiosError(err) && err.message) {
        setErrors([err.message]);
      } else if (err instanceof Error) {
        setErrors([err.message]);
      } else {
        setErrors([String(err)]);
      }
    }
  };

  const identifierFieldError = (
    fieldErrors.email ??
    fieldErrors.name ??
    []
  ).join(". ");

  return (
    <form onSubmit={handleSignIn} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">
          Email or username
        </label>
        <input
          type="text"
          placeholder="Email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          aria-label="Email or username"
          className="w-full border px-3 py-2 rounded"
        />
        {/* Visa bara fel för detta fält */}
        {(identifierFieldError ||
          errors.find(
            (msg) =>
              msg.toLowerCase().includes("email") ||
              msg.toLowerCase().includes("username")
          )) && (
          <p className="mt-1 text-sm text-red-600">
            {identifierFieldError ||
              errors.find(
                (msg) =>
                  msg.toLowerCase().includes("email") ||
                  msg.toLowerCase().includes("username")
              )}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {(fieldErrors.password?.length ||
          errors.find((msg) => msg.toLowerCase().includes("password"))) && (
          <p className="mt-1 text-sm text-red-600">
            {fieldErrors.password?.join(". ") ||
              errors.find((msg) => msg.toLowerCase().includes("password"))}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <TextButton
          type="submit"
          size="medium"
          variant="primary"
          disabled={loading || !identifier.trim() || !password}
        >
          {loading ? "Signing in..." : "Sign in"}
        </TextButton>
        <Link
          to="/sign-up"
          className="ml-2 text-primary-1 underline hover:text-primary-1/80"
        >
          Create account
        </Link>
      </div>
    </form>
  );
}

export default SignInForm;
