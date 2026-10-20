
import PostItem from "./PostItem";

function PostList({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}
    </>
  );
}

export default PostList;
