
import { useState } from "react";

function PostForm({ initialPost, onSubmit, buttonText }) {
  const [title, setTitle] = useState(
    initialPost ? initialPost.title : ""
  );

  const [description, setDescription] = useState(
    initialPost ? initialPost.description : ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim()
    });
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

      <br />

      <div>
        <label htmlFor="description">Nội dung</label>
        <textarea
          id="description"
          rows="5"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <br />

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default PostForm;
