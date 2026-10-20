
const postModel = require("../models/postModel");

function index(req, res) {
    res.json({
        success: true,
        data: postModel.getAllPosts()
    });
}

function show(req, res) {
    const post = postModel.getPostById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy bài viết"
        });
    }

    res.json({
        success: true,
        data: post
    });
}

function store(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Tiêu đề và nội dung không được để trống"
        });
    }

    const post = postModel.createPost({ title, content });

    res.status(201).json({
        success: true,
        message: "Tạo bài viết thành công",
        data: post
    });
}

function update(req, res) {
    const post = postModel.updatePost(req.params.id, req.body);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy bài viết"
        });
    }

    res.json({
        success: true,
        message: "Cập nhật bài viết thành công",
        data: post
    });
}

function destroy(req, res) {
    const deleted = postModel.deletePost(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy bài viết"
        });
    }

    res.json({
        success: true,
        message: "Xóa bài viết thành công"
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
