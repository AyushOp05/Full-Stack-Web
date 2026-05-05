import { useEffect, useState } from "react";
import {
  Activity,
  BadgeCheck,
  CalendarDays,
  Database,
  Fingerprint,
  Gauge,
  KeyRound,
  LockKeyhole,
  LogOut,
  Mail,
  Server,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [error, setError] = useState("");
  const joinedDate = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-";
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "A";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setProfile(data.user);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Could not load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const metrics = [
    { label: "Session", value: "Active", icon: ShieldCheck },
    { label: "Password", value: "Hashed", icon: KeyRound },
    { label: "Storage", value: "MongoDB", icon: Database }
  ];

  const activityItems = [
    { label: "Profile verified", detail: profile?.email || "Account email", icon: BadgeCheck },
    { label: "Session refreshed", detail: "Access confirmed for this account", icon: Activity },
    { label: "Database synced", detail: "Profile loaded from MongoDB", icon: Server }
  ];

  return (
    <main className="dashboard-app">
      <aside className="dashboard-sidebar">
        <div className="auth-brand dark">
          <div className="brand-mark">
            <ShieldCheck size={24} strokeWidth={2.4} />
          </div>
          <span>AegisID</span>
        </div>

        <nav className="side-nav" aria-label="Dashboard navigation">
          <a className="active" href="#overview">
            <Gauge size={18} />
            <span>Overview</span>
          </a>
          <a href="#profile">
            <UserRound size={18} />
            <span>Profile</span>
          </a>
          <a href="#security">
            <LockKeyhole size={18} />
            <span>Security</span>
          </a>
        </nav>
      </aside>

      <section className="dashboard-main">
        <nav className="topbar">
          <div>
            <p className="eyebrow">Protected workspace</p>
            <h1>Account Overview</h1>
          </div>
          <button className="secondary-button icon-button" type="button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        <section className="dashboard-hero" id="overview">
          <div>
            <p className="eyebrow light">
              <Sparkles size={15} />
              Secure session
            </p>
            <h2>Welcome back, {profile?.name || "there"}.</h2>
            <p>
              Your account workspace is active, verified, and ready for profile management.
            </p>
          </div>
          <div className="hero-profile">
            <div className="avatar-badge" aria-label="User initials">
              {initials}
            </div>
            <div>
              <strong>{profile?.name || "Loading..."}</strong>
              <span>{profile?.email || "Fetching profile"}</span>
            </div>
          </div>
        </section>

        <section className="metric-grid" aria-label="Account metrics">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article className="metric-tile" key={metric.label}>
                <span className="tile-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              </article>
            );
          })}
        </section>

        <section className="dashboard-grid">
          <article className="profile-card" id="profile">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Profile</p>
                <h2>{profile?.name || "Loading..."}</h2>
              </div>
              <span className="card-icon">
                <UserRound size={22} />
              </span>
            </div>

            <dl>
              <div>
                <dt>
                  <Mail size={15} />
                  Email
                </dt>
                <dd>{profile?.email || "-"}</dd>
              </div>
              <div>
                <dt>
                  <Fingerprint size={15} />
                  User ID
                </dt>
                <dd>{profile?.id || "-"}</dd>
              </div>
              <div>
                <dt>
                  <CalendarDays size={15} />
                  Joined
                </dt>
                <dd>{joinedDate}</dd>
              </div>
            </dl>
            {error && <div className="alert">{error}</div>}
          </article>

          <article className="status-panel" id="security">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Security</p>
                <h2>Account shield</h2>
              </div>
              <span className="card-icon success">
                <ShieldCheck size={22} />
              </span>
            </div>

            <ul className="check-list">
              <li>Access verification active</li>
              <li>Session protection enabled</li>
              <li>Credential storage secured</li>
            </ul>
          </article>
        </section>

        <section className="activity-panel">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Activity</p>
              <h2>Latest account events</h2>
            </div>
            <span className="card-icon">
              <Activity size={22} />
            </span>
          </div>

          <div className="activity-list">
            {activityItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label}>
                  <span>
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
