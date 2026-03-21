import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { login, signup, getCurrentUser } from "@/lib/store";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getCurrentUser()) navigate("/forum");
  }, [navigate]);

  const handleSubmit = () => {
    setError("");
    try {
      if (isLogin) {
        login(email, password);
      } else {
        if (password !== confirmPassword) { setError("Passwords do not match!"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters!"); return; }
        signup(name, email, password);
      }
      navigate("/forum");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--auth-bg)" }}>
      <Header />
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm bg-card rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 text-center animate-fade-up hover:-translate-y-1 transition-transform">
          <h2 className="text-xl font-semibold text-primary mb-5">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {error && (
            <p className="text-destructive text-sm mb-3">{error}</p>
          )}

          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 mb-3 rounded-xl border border-input bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-colors"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 mb-3 rounded-xl border border-input bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 mb-3 rounded-xl border border-input bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-colors"
          />
          {!isLogin && (
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 mb-3 rounded-xl border border-input bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-colors"
            />
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-2 py-3 rounded-full text-primary-foreground font-semibold text-sm border-none cursor-pointer active:scale-[0.97] transition-transform"
            style={{ background: "var(--btn-gradient)" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-primary font-medium hover:underline bg-transparent border-none cursor-pointer text-sm"
              style={{ fontFamily: "inherit" }}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Auth;
