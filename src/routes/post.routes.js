import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.newForm);
router.get("/:postId/edit", postController.editForm);
router.post("/", postController.create);
router.post("/:postId/update", postController.update);
router.post("/:postId/delete", postController.delete);

export default router;
