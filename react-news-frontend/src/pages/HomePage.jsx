
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h2>Trang chủ</h2>

      <p>
        Chào mừng bạn đến với Website Tin tức
        được xây dựng bằng React.
      </p>

      <p>
        Đây là website giúp bạn xem, thêm và
        chỉnh sửa các bài viết.
      </p>

      <Link to="/posts">Xem danh sách bài viết</Link>
    </div>
  );
}

export default HomePage;

