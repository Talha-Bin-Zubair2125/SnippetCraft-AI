const Editor = require("../models/EditorModel");
const joi = require("joi");
const { analyzeCode } = require("../services/groq.service");

// Validation schema
const snippetSchema = joi.object({
  title: joi.string().min(3).max(100).required().messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
    "any.required": "Title is required",
  }),
  code: joi.string().required().messages({
    "any.required": "Code is required",
  }),
  language: joi
    .string()
    .valid(
      "javascript",
      "typescript",
      "html",
      "css",
      "php",
      "python",
      "java",
      "c",
      "cpp",
      "csharp",
      "go",
      "rust",
      "ruby",
      "swift",
      "kotlin",
      "scala",
      "r",
      "perl",
      "lua",
      "dart",
      "sql",
      "json",
      "yaml",
      "xml",
      "markdown",
      "shell",
      "powershell",
    )
    .required()
    .messages({
      "any.only": "Invalid language selected",
      "any.required": "Language is required",
    }),
});

const updateSnippetSchema = joi.object({
  title: joi.string().min(3).max(100).required().messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
    "any.required": "Title is required",
  }),
  code: joi.string().required().messages({
    "any.required": "Code is required",
  }),
  language: joi
    .string()
    .valid(
      "javascript",
      "typescript",
      "html",
      "css",
      "php",
      "python",
      "java",
      "c",
      "cpp",
      "csharp",
      "go",
      "rust",
      "ruby",
      "swift",
      "kotlin",
      "scala",
      "r",
      "perl",
      "lua",
      "dart",
      "sql",
      "json",
      "yaml",
      "xml",
      "markdown",
      "shell",
      "powershell",
    )
    .required()
    .messages({
      "any.only": "Invalid language selected",
      "any.required": "Language is required",
    }),
});

const createSnippet = async (req, res) => {
  try {
    const { error } = snippetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, code, language } = req.body;

    const newSnippet = new Editor({
      title,
      code,
      language,
      createdBy: req.userId,
    });

    await newSnippet.save();

    res.status(201).json({
      message: "Snippet created successfully",
      snippet: newSnippet,
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getSnippetsByUser = async (req, res) => {
  try {
    const snippets = await Editor.find({ createdBy: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ snippets });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getSnippetById = async (req, res) => {
  try {
    const snippet = await Editor.findById(req.params.snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ snippet });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const EditSnippet = async (req, res) => {
  try {
    const { error } = updateSnippetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, code, language } = req.body;
    const { snippetId } = req.params;

    const snippet = await Editor.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    snippet.title = title;
    snippet.code = code;
    snippet.language = language;

    await snippet.save();

    res.status(200).json({ message: "Snippet updated successfully", snippet });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Editor.findById(req.params.snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Editor.findByIdAndDelete(req.params.snippetId);

    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const reviewWithAI = async (req, res) => {
  try {
    const { code, language, snippetId } = req.body;

    if (!code || !language) {
      return res
        .status(400)
        .json({ message: "Code and language are required" });
    }

    // Call Groq AI
    const review = await analyzeCode(code, language);

    const all = await Editor.find({
      createdBy: snippetId ? req.userId : null,
    }).sort({ createdAt: -1 });

    // Save AI review to snippet if snippetId provided
    if (snippetId) {
      const snippet = await Editor.findById(snippetId);

      if (snippet && snippet.createdBy.toString() === req.userId) {
        await Editor.findByIdAndUpdate(
          snippetId,
          {
            "aiReview.explanation": review.explanation,
            "aiReview.bugs": review.bugs,
            "aiReview.solutions": review.solutions,
            "aiReview.codeQuality": review.codeQuality,
            "aiReview.optimizations": review.optimizations,
            "aiReview.correctedCode": review.correctedCode,
            "aiReview.summary": review.summary,
            "aiReview.promptToSave": review.promptToSave,
            "aiReview.reviewedAt": new Date(),
          },
          {
            new: true,
          },
        );
        await snippet.save();
        console.log("AI review saved to snippet");
      }
    }

    res.status(200).json({
      message: "AI review completed",
      review,
      // Frontend uses promptToSave to ask user if they want to save corrected code
      promptToSave:
        "Do you want to save the corrected code? It will replace your original code.",
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "AI review failed" });
  }
};

const saveCorrectedCode = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const { correctedCode } = req.body;

    if (!correctedCode) {
      return res.status(400).json({ message: "Corrected code is required" });
    }
    const snippet = await Editor.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    if (snippet.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    snippet.code = correctedCode;
    await snippet.save();
    res
      .status(200)
      .json({ message: "Corrected code saved successfully", snippet });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const totalAiReviews = async (req, res) => {
  try {
    const totalReviews = await Editor.countDocuments({
      createdBy: req.userId,
      aiReview: { $exists: true },
    });
    res.status(200).json({ totalReviews });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getallaireviews = async (req, res) => {
  try {
    const reviews = await Editor.find({
      createdBy: req.userId,
      "aiReview.correctedCode": { $exists: true },
    })
      .select("title language createdAt aiReview.codeQuality")
      .sort({ createdAt: -1 });
    console.log("Fetched AI reviews:", reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSnippet,
  getSnippetsByUser,
  getSnippetById,
  deleteSnippet,
  EditSnippet,
  reviewWithAI,
  totalAiReviews,
  getallaireviews,
  saveCorrectedCode,
};
