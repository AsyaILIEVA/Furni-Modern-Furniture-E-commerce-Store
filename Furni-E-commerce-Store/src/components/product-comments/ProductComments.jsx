import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function ProductComments({ productId }) {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function getComments() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setError(error.message);
      } else {
        setComments(data || []);
      }

      setLoading(false);
    }

    getComments();

    return () => {
      active = false;
    };
  }, [productId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in to leave a comment.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter a comment.");
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          product_id: productId,
          user_id: user.id,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setComments((previousComments) => [data, ...previousComments]);
      setContent("");
    } catch (err) {
      setError(err.message || "Could not add comment.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this comment?"
  );

  if (!confirmed) return;

  setDeletingId(commentId);
  setError("");

  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", user.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error("Comment could not be deleted.");
    }

    setComments((previousComments) =>
      previousComments.filter((comment) => comment.id !== commentId)
    );
  } catch (err) {
    setError(err.message || "Could not delete comment.");
  } finally {
    setDeletingId(null);
  }
}

  return (
    <div className="mt-5">
      <h2 className="mb-4">Product Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="comment" className="form-label">
            Leave a comment
          </label>

          <textarea
            id="comment"
            className="form-control mb-3"
            rows="3"
            maxLength="1000"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p>
          Please <Link to="/login">log in</Link> to leave a comment.
        </p>
      )}

      {error && (
        <p className="text-danger" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to leave one!</p>
      ) : (
        comments.map((comment) => (
          <div className="border-bottom py-3" key={comment.id}>
            <p className="mb-1">{comment.content}</p>

            <small className="text-muted">
              {new Date(comment.created_at).toLocaleDateString()}
              {user?.id === comment.user_id && " · Your comment"}
            </small>

            {user?.id === comment.user_id && (
  <button
    type="button"
    className="btn btn-outline-danger btn-sm ms-3"
    onClick={() => handleDelete(comment.id)}
    disabled={deletingId === comment.id}
  >
    {deletingId === comment.id ? "Deleting..." : "Delete"}
  </button>
)}
          </div>
        ))
      )}
    </div>
  );
}