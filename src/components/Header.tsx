import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "@/lib/store";
import { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setUser(getCurrentUser()), 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <header
      className="flex items-center justify-between px-6 py-4 md:px-12"
      style={{ background: "var(--header-gradient)" }}
    >
      <Link to="/" className="text-xl font-bold text-primary-foreground tracking-tight">
        ◉ KnowledgeHub
      </Link>
      <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
        <Link to="/" className="text-primary-foreground/90 hover:text-primary-foreground transition-opacity">
          Home
        </Link>
        <Link to="/forum" className="text-primary-foreground/90 hover:text-primary-foreground transition-opacity">
          Forum
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-primary-foreground/90 hover:text-primary-foreground transition-opacity">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-primary-foreground/90 hover:text-primary-foreground transition-opacity cursor-pointer bg-transparent border-none font-medium text-sm"
              style={{ fontFamily: "inherit" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="text-primary-foreground/90 hover:text-primary-foreground transition-opacity">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
