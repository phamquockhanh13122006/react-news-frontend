import PostForm from "../components/PostForm";

function CreatePostPage({ onCreate }) {
  return (
    <div>
      <h2>Thêm bài viết</h2>
      <PostForm
        initialPost={null}
        onSubmit={onCreate}
        buttonText="Lưu bài viết"
      />
    </div>
  );
}

export default CreatePostPage;
