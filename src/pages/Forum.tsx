import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { createPost, subscribePosts, type Post } from "@/lib/forum";

const COOLDOWN_MS = 10000;

const Forum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribePosts(setPosts);
    return () => unsub();
  }, []);

  const trending = useMemo(
    () => [...posts].filter((p) => p.commentCount > 0).sort((a, b) => b.commentCount - a.commentCount).slice(0, 3),
    [posts]
  );
  const trendingIds = new Set(trending.map((t) => t.id));

  const handlePost = async () => {
    setError(null);
    if (!content.trim()) return;
    const last = Number(localStorage.getItem("kh_last_post") || 0);
    if (Date.now() - last < COOLDOWN_MS) {
      setError(`Please wait ${Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000)}s before posting again.`);
      return;
    }
    setSubmitting(true);
    try {
      await createPost(content);
      localStorage.setItem("kh_last_post", String(Date.now()));
      setContent("");
    } catch (e: any) {
      setError(e.message || "Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="flex-1 w-[92%] max-w-3xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-8 border border-border/50"
        >
          <h2 className="text-lg font-semibold text-card-foreground mb-3">✎ Share Anonymously</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">No login needed · tracked anonymously by device</span>
            <button
              onClick={handlePost}
              disabled={submitting}
              className="px-6 py-2.5 rounded-full text-primary-foreground font-semibold text-sm border-none cursor-pointer active:scale-[0.97] transition-transform disabled:opacity-50"
              style={{ background: "var(--btn-gradient)" }}
            >
              {submitting ? "Posting..." : "⟡ Post"}
            </button>
          </div>
        </motion.div>

        {trending.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              🔥 Trending Posts
            </h3>
            {trending.map((p) => (
              <PostCard key={p.id} post={p} trending />
            ))}
          </div>
        )}

        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Recent Posts
        </h3>

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No posts yet. Be the first!</p>
        )}

        {posts.filter((p) => !trendingIds.has(p.id)).map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Forum;
