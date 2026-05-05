import { useState } from "react";
import { ArrowRight, BadgeCheck, Database, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getApiError } from "../api/getApiError.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await login(formData);
      navigate("/dashboard");
    } catch (apiError) {
      setError(getApiError(apiError, "Unable to log in. Please try again."));
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
            <p className="eyebrow light">Secure access</p>
            <h1>Welcome to your private account command center.</h1>
            <p>
              A focused workspace for identity, profile data, and secure session visibility.
            </p>
          </div>

          <div className="trust-stack" aria-label="Platform strengths">
            <article>
              <LockKeyhole size={20} />
              <div>
                <strong>Encrypted credentials</strong>
                <span>Password records stay protected at rest.</span>
              </div>
            </article>
            <article>
              <BadgeCheck size={20} />
              <div>
                <strong>Verified sessions</strong>
                <span>Access is granted only after authentication.</span>
              </div>
            </article>
            <article>
              <Database size={20} />
              <div>
                <strong>Persistent profile</strong>
                <span>Your account data is saved locally in MongoDB.</span>
              </div>
            </article>
          </div>
        </aside>

        <section className="auth-panel">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Log in</h2>
            <p className="muted">Enter your credentials to continue to the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {error && <div className="alert">{error}</div>}

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
                  autoComplete="current-password"
                  placeholder="Enter password"
                  required
                />
              </span>
            </label>

            <button className="primary-button" type="submit" disabled={submitting}>
              <span>{submitting ? "Logging in..." : "Login"}</span>
              <ArrowRight size={19} />
            </button>
          </form>

          <p className="switch-copy">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </section>
      </section>
    </main>
  );
}

export default Login;
