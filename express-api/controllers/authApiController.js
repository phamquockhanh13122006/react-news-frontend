
function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng nhập tên đăng nhập và mật khẩu"
        });
    }

    if (username === "admin" && password === "123456") {
        req.session.user = { username };

        return res.json({
            success: true,
            message: "Đăng nhập thành công",
            user: req.session.user
        });
    }

    return res.status(401).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng"
    });
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Không thể đăng xuất"
            });
        }

        res.clearCookie("connect.sid");

        return res.json({
            success: true,
            message: "Đăng xuất thành công"
        });
    });
}

function me(req, res) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            success: false,
            message: "Bạn chưa đăng nhập"
        });
    }

    return res.json({
        success: true,
        user: req.session.user
    });
}

module.exports = { login, logout, me };
