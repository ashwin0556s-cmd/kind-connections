import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Post, Comment, addComment, subscribeComments } from "@/lib/forum";
import { getDeviceId } from "@/lib/device";

interface Props {
  post: Post;
  trending?: boolean;
}

const PostCard = ({ post, trending }: Props) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const myId = getDeviceId();

  useEffect(() => {
    if (!open) return;
    const unsub = subscribeComments(post.id, setComments);
    return () => unsub();
  }, [open, post.id]);

  const handleAdd = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      await addComment(post.id, text);
      setText("");
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-5 border border-border/50"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          👤 {post.deviceId === myId ? "You" : `Anon · ${post.deviceId.slice(0, 6)}`}
        </span>
        <div className="flex items-center gap-2">
          {trending && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
              🔥 Trending
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </span>
        </div>
      </div>
      <p className="text-card-foreground whitespace-pre-wrap leading-relaxed mb-4">
        {post.content}
      </p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer font-medium"
      >
        💬 {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="text-sm bg-muted/50 rounded-lg p-2">
                  <div className="text-xs text-muted-foreground mb-0.5">
                    {c.deviceId === myId ? "You" : `Anon · ${c.deviceId.slice(0, 6)}`}
                  </div>
                  <div className="text-card-foreground">{c.content}</div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground">No comments yet.</p>
              )}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleAdd}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-primary-foreground text-sm font-medium border-none cursor-pointer active:scale-[0.97] transition-transform disabled:opacity-50"
                  style={{ background: "var(--btn-gradient)" }}
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
