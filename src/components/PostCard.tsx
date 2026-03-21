import { useState } from "react";
import { Post, getCurrentUser, likePost, hasLiked, deletePost, getComments, addComment } from "@/lib/store";

interface PostCardProps {
  post: Post;
  onUpdate: () => void;
}

const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const user = getCurrentUser();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(getComments(post.id));
  const [commentText, setCommentText] = useState("");
  const liked = hasLiked(post.id);

  const handleLike = () => {
    likePost(post.id);
    onUpdate();
  };

  const handleDelete = () => {
    if (confirm("Delete post?")) {
      deletePost(post.id);
      onUpdate();
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText("");
    setComments(getComments(post.id));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) setComments(getComments(post.id));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.06)] mb-5 animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">👤 {post.userName}</span>
        <span className="text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <h3 className="font-semibold text-card-foreground mb-2">{post.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.content}</p>
      <div className="flex flex-wrap gap-4 text-sm font-medium">
        <button
          onClick={handleLike}
          className={`cursor-pointer transition-colors bg-transparent border-none font-medium text-sm ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          style={{ fontFamily: "inherit" }}
        >
          {liked ? "♥" : "♡"} Like ({post.likeCount})
        </button>
        <button
          onClick={toggleComments}
          className="cursor-pointer text-muted-foreground hover:text-primary transition-colors bg-transparent border-none font-medium text-sm"
          style={{ fontFamily: "inherit" }}
        >
          💬 Comment
        </button>
        {user?.uid === post.userId && (
          <button
            onClick={handleDelete}
            className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors bg-transparent border-none font-medium text-sm"
            style={{ fontFamily: "inherit" }}
          >
            🗑 Delete
          </button>
        )}
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-3 mb-3">
            {comments.map(c => (
              <div key={c.id} className="text-sm">
                <strong className="text-card-foreground">{c.userName}:</strong>{" "}
                <span className="text-muted-foreground">{c.text}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
          </div>
          {user && (
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleComment}
                className="px-4 py-2 rounded-lg text-primary-foreground text-sm font-medium border-none cursor-pointer active:scale-[0.97] transition-transform"
                style={{ background: "var(--btn-gradient)" }}
              >
                ➤
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
