import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import type { Role } from "../../types/types";
import TextButton from "../../components/buttons/TextButton";

const roleOptions: Role[] = ["sender", "receiver", "carrier"];

const initialState = {
  email: "",
  name: "",
  password: "",
  role: "" as Role,
  companyName: "",
};

type ApiIssue = { path?: string[]; message?: string };
type ApiErrorResponse = {
  errors?: ApiIssue[];
  message?: string | string[];
  error?: string;
};

function SignUpForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setFieldErrors({});
    setSuccess(false);

    const newErrors: string[] = [];
    if (!form.email) newErrors.push("Email is required");
    if (!form.name) newErrors.push("Name is required");
    if (!form.password) newErrors.push("Password is required");
    if (!form.companyName) newErrors.push("Company name is required");
    if (!form.role) newErrors.push("Role is required");
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/sign-up", form);
      setSuccess(true);
      setForm(initialState);
    } catch (err: unknown) {
      setLoading(false);

      let respData: ApiErrorResponse | undefined;
      if (axios.isAxiosError(err) && err.response?.data) {
        respData = err.response.data as ApiErrorResponse;
      }
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
      setErrors(["Registration failed. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string) => fieldErrors[field]?.join(". ") ?? "";

  const isFormValid = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    const nameValid = form.name.length >= 3 && form.name.length <= 50;

    const passwordValid =
      form.password.length >= 6 && form.password.length <= 50;

    const roleValid = form.role.length >= 3 && form.role.length <= 50;

    const companyValid =
      form.companyName.length >= 3 && form.companyName.length <= 50;

    return (
      emailValid && nameValid && passwordValid && roleValid && companyValid
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded">
          Registration successful! You can now sign in.
        </div>
      )}
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-700 p-3 rounded">
          <ul className="list-disc list-inside">
            {errors.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="user@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {getFieldError("email") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("email")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {getFieldError("name") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("name")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Minimum 6 characters"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {getFieldError("password") && (
          <p className="mt-1 text-sm text-red-600">
            {getFieldError("password")}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="" disabled>
            Select role
          </option>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
        {getFieldError("role") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("role")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company name</label>
        <input
          type="text"
          name="companyName"
          placeholder="Your company name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {getFieldError("companyName") && (
          <p className="mt-1 text-sm text-red-600">
            {getFieldError("companyName")}
          </p>
        )}
      </div>

      <TextButton
        type="submit"
        size="medium"
        variant="primary"
        disabled={loading || !isFormValid()}
      >
        {loading ? "Registering..." : "Register"}
      </TextButton>
      <div className="mt-2">
        <Link
          to="/sign-in"
          className="text-primary-1 underline hover:text-primary-1/80"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
