import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountUp from "@/components/CountUp";
import { subscribeAnalytics, type Analytics } from "@/lib/forum";

const Index = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    visitors: 0,
    totalPosts: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const unsub = subscribeAnalytics(setAnalytics);
    return () => unsub();
  }, []);

  const stats = [
    { label: "Total Visitors", value: analytics.visitors, icon: "👥" },
    { label: "Total Posts", value: analytics.totalPosts, icon: "✍️" },
    { label: "Total Comments", value: analytics.totalComments, icon: "💬" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section
        className="flex flex-col items-center justify-center text-center px-6 py-32"
        style={{ background: "var(--hero-gradient)" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-primary-foreground mb-5"
          style={{ lineHeight: "1.1" }}
        >
          Grow the World's Knowledge ✦
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl"
        >
          Anonymous, open, real-time. Share ideas instantly — no signup required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/forum"
            className="inline-block px-8 py-3 rounded-full bg-card text-primary font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            ✧ Enter the Forum
          </Link>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4"
          >
            Live Community Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-center mb-14"
          >
            Updated in real-time as the community grows.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-border/50 text-center"
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <CountUp value={s.value} />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
