import { Link, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

function EditPostPage({ posts, onUpdate }) {
  const { id } = useParams();
  const post = posts.find((item) => String(item.id) === String(id));

  if (!post) {
    return (
      <div>
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/posts">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Sửa bài viết</h2>
      <PostForm
        key={post.id}
        initialPost={post}
        onSubmit={(postData) => onUpdate(id, postData)}
        buttonText="Cập nhật"
      />
    </div>
  );
}

export default EditPostPage;
