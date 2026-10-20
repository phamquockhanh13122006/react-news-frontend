import { Link, useParams } from "react-router-dom";

function PostDetailPage({ posts, loading, onDelete, user }) {
  const { id } = useParams();
  const post = posts.find((item) => String(item.id) === String(id));

  if (loading && !post) {
    return <p>Đang tải bài viết...</p>;
  }

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
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <Link to="/posts">Quay lại danh sách</Link>

      {user && (
        <div>
          <Link to={`/posts/${post.id}/edit`}>Sửa bài viết</Link>
          {" "}
          <button onClick={() => onDelete(post.id)}>
            Xóa bài viết
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetailPage;
