
import { useState, useEffect, useCallback } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const navigate = useNavigate();

    const loadPosts = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/posts");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Không tải được danh sách bài viết."
                );
            }

            let list = [];

            if (Array.isArray(data)) {
                list = data;
            } else if (Array.isArray(data.posts)) {
                list = data.posts;
            } else if (Array.isArray(data.data)) {
                list = data.data;
            }

            setPosts(list);
            setError("");
        } catch (err) {
            console.error("Lỗi tải bài viết:", err);
            setError(err.message || "Không thể kết nối máy chủ.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        async function checkLogin() {
            try {
                const response = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include"
                });

                const data = await response.json();

                if (active && response.ok && data.success) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Lỗi kiểm tra phiên đăng nhập:", err);
            } finally {
                if (active) {
                    setCheckingAuth(false);
                }
            }
        }

        checkLogin();
        loadPosts();

        return () => {
            active = false;
        };
    }, [loadPosts]);

    function handleLogin(loggedInUser) {
        setUser(loggedInUser);
        navigate("/", { replace: true });
    }

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Đăng xuất thất bại.");
            }

            setUser(null);
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Lỗi đăng xuất:", err);
            alert(err.message || "Không thể đăng xuất.");
        }
    }

    async function sendPostRequest(url, method, postData) {
        const response = await fetch(url, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || "Thao tác bài viết thất bại.");
        }

        return data;
    }

    async function createPost(postData) {
        try {
            await sendPostRequest("/api/posts", "POST", postData);
            await loadPosts();
            navigate("/posts");
        } catch (err) {
            alert(err.message || "Không thể thêm bài viết.");
        }
    }

    async function updatePost(id, postData) {
        try {
            await sendPostRequest(`/api/posts/${id}`, "PUT", postData);
            await loadPosts();
            navigate(`/posts/${id}`);
        } catch (err) {
            alert(err.message || "Không thể cập nhật bài viết.");
        }
    }

    async function deletePost(id) {
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa bài viết này không?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.message || "Xóa bài viết thất bại.");
            }

            await loadPosts();
            navigate("/posts");
        } catch (err) {
            alert(err.message || "Không thể xóa bài viết.");
        }
    }

    if (checkingAuth) {
        return <p>Đang kiểm tra đăng nhập...</p>;
    }

    return (
        <>
            <Header user={user} onLogout={handleLogout} />

            <main>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            user
                                ? <Navigate to="/" replace />
                                : <LoginPage onLogin={handleLogin} />
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <HomePage
                                posts={posts}
                                loading={loading}
                                error={error}
                            />
                        }
                    />

                    <Route
                        path="/posts"
                        element={
                            <PostListPage posts={posts} />
                        }
                    />

                    <Route
                        path="/posts/:id"
                        element={
                            <PostDetailPage
                                posts={posts}
                                loading={loading}
                                onDelete={deletePost}
                                user={user}
                            />
                        }
                    />

                    <Route
                        path="/posts/create"
                        element={
                            user
                                ? <CreatePostPage onCreate={createPost} />
                                : <Navigate to="/login" replace />
                        }
                    />

                    <Route
                        path="/posts/:id/edit"
                        element={
                            user
                                ? (
                                    <EditPostPage
                                        posts={posts}
                                        onUpdate={updatePost}
                                    />
                                )
                                : <Navigate to="/login" replace />
                        }
                    />

                    <Route
                        path="/contact"
                        element={<ContactPage />}
                    />

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
