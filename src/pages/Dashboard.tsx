import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser, getUserPosts, type User, type Post } from "@/lib/store";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { navigate("/auth"); return; }
    setUser(u);
    setPosts(getUserPosts(u.uid));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="flex-1 w-[90%] max-w-3xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-foreground mb-8 animate-fade-up">Your Dashboard</h1>

        <div className="bg-card rounded-xl p-6 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-8 animate-fade-up">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">{user.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Posts</p>
              <p className="text-xl font-bold text-foreground">{user.postCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Comments</p>
              <p className="text-xl font-bold text-foreground">{user.commentCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Likes Received</p>
              <p className="text-xl font-bold text-foreground">{user.totalLikesReceived}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Member since</p>
              <p className="text-sm font-medium text-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Your Posts</h2>
        {posts.length === 0 && (
          <p className="text-muted-foreground text-sm">You haven't posted anything yet.</p>
        )}
        {posts.map(post => (
          <div key={post.id} className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-4 animate-fade-up">
            <h3 className="font-medium text-card-foreground mb-1">{post.title}</h3>
            <p className="text-sm text-muted-foreground">Likes: {post.likeCount}</p>
            <small className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
