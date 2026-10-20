
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    alert("Đăng nhập với tài khoản: " + username);
  }

  return (
    <div>
      <h2>Đăng nhập</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">Đăng nhập</button>
      </form>

      <p>Đây là giao diện đăng nhập demo.</p>
    </div>
  );
}

export default LoginPage;
