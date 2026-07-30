const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
      enum: [
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
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiReview: {
      explanation: [
        {
          line: {
            type: Number,
          },

          code: {
            type: String,
          },

          explanation: {
            type: String,
          },
        },
      ],

      bugs: [
        {
          line: {
            type: Number,
          },

          issue: {
            type: String,
          },

          severity: {
            type: String,
            enum: ["low", "medium", "high"],
          },

          example: {
            type: String,
          },
        },
      ],

      solutions: [
        {
          line: {
            type: Number,
          },

          fix: {
            type: String,
          },

          reason: {
            type: String,
          },

          improvement: {
            type: String,
          },
        },
      ],

      codeQuality: {
        score: {
          type: Number,
          default: 0,
        },

        grade: {
          type: String,
          default: "N/A",
        },

        readability: {
          score: {
            type: Number,
            default: 0,
          },

          feedback: {
            type: String,
          },
        },

        maintainability: {
          score: {
            type: Number,
            default: 0,
          },

          feedback: {
            type: String,
          },
        },

        performance: {
          score: {
            type: Number,
            default: 0,
          },

          feedback: {
            type: String,
          },
        },

        bestPractices: {
          score: {
            type: Number,
            default: 0,
          },

          feedback: {
            type: String,
          },
        },

        codeSmells: [
          {
            type: String,
          },
        ],
      },

      optimizations: [
        {
          title: {
            type: String,
          },

          description: {
            type: String,
          },

          before: {
            type: String,
          },

          after: {
            type: String,
          },
        },
      ],

      correctedCode: {
        type: String,
      },

      summary: {
        type: String,
      },

      promptToSave: {
        type: String,
      },

      reviewedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },

  {
    timestamps: true,
  },
);

const Editor = mongoose.model("Editor", editorSchema);

module.exports = Editor;
