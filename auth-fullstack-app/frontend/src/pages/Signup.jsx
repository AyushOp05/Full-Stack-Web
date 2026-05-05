import { useState } from "react";
import {
  ArrowRight,
  Database,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getApiError } from "../api/getApiError.js";
import { useAuth } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (apiError) {
      setError(getApiError(apiError, "Unable to create account. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="screen auth-screen">
      <section className="auth-shell">
        <aside className="auth-story">
          <div className="auth-brand">
            <div className="brand-mark">
              <ShieldCheck size={25} strokeWidth={2.4} />
            </div>
            <span>AegisID</span>
          </div>

          <div className="story-copy">
            <p className="eyebrow light">Start secure</p>
            <h1>Create your secure digital identity.</h1>
            <p>
              A professional account portal with protected access and clean profile management.
            </p>
          </div>

          <div className="trust-stack" aria-label="Security highlights">
            <article>
              <Fingerprint size={20} />
              <div>
                <strong>Identity-first</strong>
                <span>Profile data is tied to a verified account.</span>
              </div>
            </article>
            <article>
              <LockKeyhole size={20} />
              <div>
                <strong>Private by default</strong>
                <span>The dashboard stays locked until authentication.</span>
              </div>
            </article>
            <article>
              <Database size={20} />
              <div>
                <strong>MongoDB backed</strong>
                <span>Account records persist across sessions.</span>
              </div>
            </article>
          </div>
        </aside>

        <section className="auth-panel">
          <div>
            <p className="eyebrow">Join AegisID</p>
            <h2>Create your account</h2>
            <p className="muted">Set up your profile and unlock the workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {error && <div className="alert">{error}</div>}

            <label>
              Name
              <span className="input-shell">
                <UserRound size={19} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  minLength="2"
                  placeholder="Ayush Gupta"
                  required
                />
              </span>
            </label>

            <label>
              Email
              <span className="input-shell">
                <Mail size={19} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </span>
            </label>

            <label>
              Password
              <span className="input-shell">
                <KeyRound size={19} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength="6"
                  placeholder="Minimum 6 characters"
                  required
                />
              </span>
            </label>

            <button className="primary-button" type="submit" disabled={submitting}>
              <span>{submitting ? "Creating..." : "Sign up"}</span>
              <ArrowRight size={19} />
            </button>
          </form>

          <p className="switch-copy">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </section>
    </main>
  );
}

export default Signup;
