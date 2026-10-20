
import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>

      <p>{post.description}</p>

      <Link to={`/posts/${post.id}`}>
        Xem chi tiết
      </Link>

      {" | "}

      <Link to={`/posts/${post.id}/edit`}>
        Sửa
      </Link>
    </div>
  );
}

export default PostItem;
