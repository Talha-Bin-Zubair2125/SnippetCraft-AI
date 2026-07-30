const express = require("express");
const router = express.Router();
const {
  createSnippet,
  getSnippetsByUser,
  getSnippetById,
  deleteSnippet,
  EditSnippet,
  reviewWithAI,
  totalAiReviews,
  getallaireviews,
  saveCorrectedCode,
} = require("../controllers/EditorController");
const { protect } = require("../middlewares/AuthMiddleware");

router.post("/create-snippet", protect, createSnippet);
router.get("/snippets", protect, getSnippetsByUser);
router.get("/snippet/:snippetId", protect, getSnippetById);
router.put("/edit-snippet/:snippetId", protect, EditSnippet);
router.put("/save-corrected-code/:snippetId", protect, saveCorrectedCode);
router.get("/total-ai-reviews", protect, totalAiReviews);
router.get("/all-ai-reviews", protect, getallaireviews);
router.delete("/delete-snippet/:snippetId", protect, deleteSnippet);
router.post("/review", protect, reviewWithAI);

module.exports = router;
