
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React Router",
      description:
        "React Router giúp xây dựng website nhiều trang trong React."
    },
    {
      id: 2,
      title: "NodeJS API",
      description:
        "Backend API cung cấp dữ liệu cho frontend React."
    },
    {
      id: 3,
      title: "React State",
      description:
        "State giúp quản lý dữ liệu thay đổi trong component."
    }
  ]);

  // Thêm bài viết
  function createPost(newPost) {
    setPosts((currentPosts) => [
      ...currentPosts,
      newPost
    ]);
  }

  // Cập nhật bài viết
  function updatePost(updatedPost) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === updatedPost.id
          ? updatedPost
          : post
      )
    );
  }

  return (
    <>
      <Header />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage posts={posts} />}
          />

          <Route
            path="/posts"
            element={<PostListPage posts={posts} />}
          />

          <Route
            path="/posts/:id"
            element={<PostDetailPage posts={posts} />}
          />

          <Route
            path="/posts/create"
            element={
              <CreatePostPage
                onCreatePost={createPost}
              />
            }
          />

          <Route
            path="/posts/:id/edit"
            element={
              <EditPostPage
                posts={posts}
                onUpdatePost={updatePost}
              />
            }
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

          <Route
            path="*"
            element={
              <div>
                <h2>Không tìm thấy trang</h2>
                <p>Vui lòng chọn một mục trên thanh menu.</p>
              </div>
            }
          />
        </Routes>

        <hr />

        <p>
          Số bài viết hiện có: {posts.length}
        </p>
      </main>

      <Footer />
    </>
  );
}

export default App;
