import postService from "../services/postService.js";

const renderPostsPage = async (res, options = {}) => {
    const posts = options.posts ?? await postService.getPosts();

    res.render("posts", {
        posts,
        error: options.error ?? null,
    });
};

const renderPostFormPage = async (res, options = {}) => {
    const users = options.users ?? await postService.getUsers();

    res.render("post-form", {
        users,
        postToEdit: options.postToEdit ?? null,
        error: options.error ?? null,
        formData: options.formData ?? {},
    });
};

class PostController {
    async create(req, res) {
        try {
            const { userId, ...postData } = req.body;
            await postService.createPost(userId, postData);
            res.redirect("/posts");
        } catch (error) {
            await renderPostFormPage(res, {
                error: error.message,
                formData: req.body,
            });
        }
    }

    async getAll(req, res) {
        try {
            await renderPostsPage(res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async newForm(req, res) {
        try {
            await renderPostFormPage(res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async editForm(req, res) {
        try {
            const postToEdit = await postService.getPostById(req.params.postId);
            await renderPostFormPage(res, {
                postToEdit,
                formData: {
                    title: postToEdit.title,
                    content: postToEdit.content,
                    hashtags: postToEdit.hashtags.join(", "),
                    imageUrl: postToEdit.imageUrl,
                    userId: postToEdit.user?._id?.toString(),
                },
            });
        } catch (error) {
            res.redirect("/posts");
        }
    }

    async update(req, res) {
        try {
            const { userId, ...postData } = req.body;
            await postService.updatePost(req.params.postId, userId, postData);
            res.redirect("/posts");
        } catch (error) {
            const users = await postService.getUsers();

            await renderPostFormPage(res, {
                users,
                error: error.message,
                postToEdit: { _id: req.params.postId },
                formData: req.body,
            });
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.postId);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PostController();
