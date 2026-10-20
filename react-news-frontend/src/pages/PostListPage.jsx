
import PostList from "../components/PostList";

function PostListPage({ posts }) {
  return (
    <div>
      <h2>Danh sách bài viết</h2>
      <PostList posts={posts} />
    </div>
  );
}

export default PostListPage;
