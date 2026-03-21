import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { getPosts, createPost, getCurrentUser } from "@/lib/store";

const Forum = () => {
  const [posts, setPosts] = useState(getPosts());
  const [content, setContent] = useState("");
  const user = getCurrentUser();

  const refresh = useCallback(() => setPosts(getPosts()), []);

  const handlePost = () => {
    if (!content.trim() || !user) return;
    createPost(content.trim());
    setContent("");
    refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="flex-1 w-[90%] max-w-3xl mx-auto py-12">
        {user && (
          <div className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-8 animate-fade-up">
            <h2 className="text-lg font-semibold text-card-foreground mb-3">✎ Share Something</h2>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your thoughts..."
              className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handlePost}
              className="mt-3 px-6 py-2.5 rounded-full text-primary-foreground font-semibold text-sm border-none cursor-pointer active:scale-[0.97] transition-transform"
              style={{ background: "var(--btn-gradient)" }}
            >
              ⟡ Post
            </button>
          </div>
        )}

        {!user && (
          <div className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-8 text-center animate-fade-up">
            <p className="text-muted-foreground">
              <a href="/auth" className="text-primary font-medium hover:underline">Login</a> to share and interact with posts.
            </p>
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No posts yet. Be the first to share!</p>
        )}

        {posts.map(post => (
          <PostCard key={post.id} post={post} onUpdate={refresh} />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Forum;
