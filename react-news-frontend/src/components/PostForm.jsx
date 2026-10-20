import { useState } from "react";

function PostForm({ initialPost, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim()
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Nội dung</label>
        <textarea
          id="content"
          rows="5"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : buttonText}
      </button>
    </form>
  );
}

export default PostForm;
