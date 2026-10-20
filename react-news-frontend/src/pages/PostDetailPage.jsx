
import { Link, useParams } from "react-router-dom";

function PostDetailPage({ posts }) {
  const { id } = useParams();

  const post = posts.find(
    (item) => item.id === Number(id)
  );

  if (!post) {
    return (
      <div>
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/posts">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      <Link to="/posts">
        Quay lại danh sách
      </Link>
    </div>
  );
}

export default PostDetailPage;
