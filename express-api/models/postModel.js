
let posts = [
    {
        id: 1,
        title: "Bài viết thứ nhất",
        content: "Đây là nội dung bài viết thứ nhất."
    },
    {
        id: 2,
        title: "Bài viết thứ hai",
        content: "Đây là nội dung bài viết thứ hai."
    }
];

function getAllPosts() {
    return posts;
}

function getPostById(id) {
    return posts.find(post => post.id === Number(id));
}

function createPost(data) {
    const newPost = {
        id: posts.length > 0
            ? Math.max(...posts.map(post => post.id)) + 1
            : 1,
        title: data.title,
        content: data.content
    };

    posts.push(newPost);
    return newPost;
}

function updatePost(id, data) {
    const post = getPostById(id);

    if (!post) {
        return null;
    }

    post.title = data.title ?? post.title;
    post.content = data.content ?? post.content;

    return post;
}

function deletePost(id) {
    const index = posts.findIndex(
        post => post.id === Number(id)
    );

    if (index === -1) {
        return false;
    }

    posts.splice(index, 1);
    return true;
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
