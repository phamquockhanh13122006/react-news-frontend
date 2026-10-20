
import { useState } from "react";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username.trim(),
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(
                    data.message || "Tên đăng nhập hoặc mật khẩu không đúng."
                );
                return;
            }

            if (typeof onLogin === "function") {
                onLogin(data.user);
            } else {
                setError("Thiếu hàm xử lý đăng nhập trong App.jsx.");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            setError(
                "Không thể kết nối máy chủ. Hãy kiểm tra backend và tải lại trang."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Đăng nhập</h1>
                <p>React News Management</p>

                <label htmlFor="username">
                    Tên đăng nhập
                </label>

                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    autoComplete="username"
                    required
                />

                <label htmlFor="password">
                    Mật khẩu
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    required
                />

                {error && (
                    <p className="login-error" role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
        </main>
    );
}

export default LoginPage;
