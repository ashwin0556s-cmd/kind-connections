import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 md:px-12 sticky top-0 z-50 backdrop-blur"
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
        <span className="text-primary-foreground/60 cursor-not-allowed" title="Coming soon">
          Pinned
        </span>
      </nav>
    </header>
  );
};

export default Header;
