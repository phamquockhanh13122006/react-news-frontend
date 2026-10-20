
import { NavLink, useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Website Tin tức</h1>

      <nav>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/posts">Bài viết</NavLink>

        {user && (
          <NavLink to="/posts/create">Thêm bài viết</NavLink>
        )}

        <NavLink to="/contact">Liên hệ</NavLink>

        {user ? (
          <>
            <span>Xin chào, {user.username}</span>
            <button
              type="button"
              onClick={async () => {
                await onLogout();
              }}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
