
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Website Tin tức</h1>

      <nav>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/posts">Bài viết</NavLink>
        <NavLink to="/posts/create">Thêm bài viết</NavLink>
        <NavLink to="/login">Đăng nhập</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </nav>
    </header>
  );
}

export default Header;
