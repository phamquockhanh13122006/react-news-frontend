
import { Link, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

function EditPostPage({ posts, onUpdatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find(
    (item) => item.id === Number(id)
  );

  if (!post) {
    return (
      <div>
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/posts">Quay lại danh sách</Link>
      </div>
    );
  }

  function handleUpdate(postData) {
    const updatedPost = {
      id: post.id,
      title: postData.title,
      description: postData.description
    };

    onUpdatePost(updatedPost);
    navigate("/posts");
  }

  return (
    <div>
      <h2>Sửa bài viết</h2>

      <PostForm
        key={post.id}
        initialPost={post}
        onSubmit={handleUpdate}
        buttonText="Cập nhật"
      />
    </div>
  );
}

export default EditPostPage;
