
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

function CreatePostPage({ onCreatePost }) {
  const navigate = useNavigate();

  function handleCreate(postData) {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      description: postData.description
    };

    onCreatePost(newPost);
    navigate("/posts");
  }

  return (
    <div>
      <h2>Thêm bài viết</h2>

      <PostForm
        initialPost={null}
        onSubmit={handleCreate}
        buttonText="Lưu bài viết"
      />
    </div>
  );
}

export default CreatePostPage;
