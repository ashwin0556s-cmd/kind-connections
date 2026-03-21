import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <section
      className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24"
      style={{ background: "var(--hero-gradient)" }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold text-primary-foreground mb-5 animate-fade-up"
        style={{ lineHeight: "1.1" }}
      >
        Grow the World's Knowledge ✦
      </h1>
      <p className="text-lg text-primary-foreground/85 mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
        Ask, share, and explore ideas with people worldwide.
      </p>
      <Link
        to="/forum"
        className="inline-block px-8 py-3 rounded-full bg-card text-primary font-semibold shadow-lg hover:bg-secondary transition-colors active:scale-[0.97] animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        ✧ Ask a Question
      </Link>
    </section>
    <Footer />
  </div>
);

export default Index;
