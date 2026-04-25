import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    parseHashtags(hashtags) {
        if (Array.isArray(hashtags)) {
            return hashtags.filter(Boolean);
        }

        if (typeof hashtags !== "string") {
            return [];
        }

        return hashtags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        return await postRepository.create({
            ...postData,
            hashtags: this.parseHashtags(postData.hashtags),
            user: user._id,
        });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async getPostById(postId) {
        const post = await postRepository.findById(postId);
        if (!post) throw new Error("Post no encontrado");

        return post;
    }

    async updatePost(postId, userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        const updatedPost = await postRepository.update(postId, {
            ...postData,
            hashtags: this.parseHashtags(postData.hashtags),
            updatedAt: new Date(),
            user: user._id,
        });

        if (!updatedPost) throw new Error("Post no encontrado");

        return updatedPost;
    }

    async deletePost(postId) {
        const deletedPost = await postRepository.delete(postId);
        if (!deletedPost) throw new Error("Post no encontrado");

        return deletedPost;
    }

    async getUsers() {
        return await userRepository.findAll();
    }
}

export default new PostService();
