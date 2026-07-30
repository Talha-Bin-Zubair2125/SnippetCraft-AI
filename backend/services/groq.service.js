require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const addLineNumbers = (code) => {
  return code
    .split("\n")
    .map((line, index) => `${index + 1} | ${line}`)
    .join("\n");
};

const analyzeCode = async (code, language) => {
  try {
    const numberedCode = addLineNumbers(code);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a senior software engineer and code quality expert.

Perform a DEEP and THOROUGH analysis of the provided ${language} code.

=== ANALYSIS REQUIREMENTS ===

1. LINE BY LINE EXPLANATION:
   - Explain EVERY single line without skipping any.
   - Never combine multiple lines.
   - Line numbers must match exactly.
   - Explain imports, variables, functions, loops, conditions, comments.
   - Keep explanations beginner-friendly but technically accurate.

2. BUG DETECTION:
   - Find ALL bugs including logic errors, null checks, type mismatches.
   - Check for security vulnerabilities (injection, XSS, hardcoded secrets).
   - Check for runtime errors (undefined variables, infinite loops).
   - Check for edge cases not handled.
   - Rate each bug severity: low, medium, or high.

3. CODE QUALITY ANALYSIS:
   - Rate overall code quality from 1-10.
   - Check readability (naming conventions, clarity).
   - Check maintainability (is code modular, reusable?).
   - Check performance (unnecessary loops, heavy operations).
   - Check best practices (DRY principle, SOLID principles).
   - Check code structure and organization.
   - Identify code smells (duplicated code, long functions, magic numbers).

4. SOLUTIONS:
   - Provide a clear fix for every bug found.
   - Explain WHY each fix works.
   - Show the corrected line of code.

5. OPTIMIZATIONS:
   - Suggest performance improvements.
   - Suggest better algorithms or data structures if applicable.
   - Suggest modern syntax or language features that improve the code.

6. CORRECTED CODE:
   - Provide the COMPLETE corrected and optimized version.
   - Apply ALL bug fixes and optimizations.
   - Add helpful comments where needed.
   - This is what the user will be prompted to save in the editor.

Return ONLY a valid JSON object with this EXACT structure:

{
  "explanation": [
    {
      "line": 1,
      "code": "exact code from line",
      "explanation": "clear beginner-friendly explanation"
    }
  ],
  "bugs": [
    {
      "line": 1,
      "issue": "description of the bug",
      "severity": "low or medium or high",
      "example": "show what goes wrong"
    }
  ],
  "solutions": [
    {
      "line": 1,
      "fix": "corrected code for this line",
      "reason": "why this fix works",
      "improvement": "what this improves"
    }
  ],
  "codeQuality": {
    "score": 7,
    "grade": "B",
    "readability": {
      "score": 7,
      "feedback": "feedback on variable naming, clarity etc"
    },
    "maintainability": {
      "score": 6,
      "feedback": "feedback on modularity, reusability etc"
    },
    "performance": {
      "score": 8,
      "feedback": "feedback on efficiency, algorithms etc"
    },
    "bestPractices": {
      "score": 7,
      "feedback": "feedback on DRY, SOLID, conventions etc"
    },
    "codeSmells": [
      "list of detected code smells"
    ]
  },
  "optimizations": [
    {
      "title": "short title of optimization",
      "description": "what to optimize and how",
      "before": "code before optimization",
      "after": "code after optimization"
    }
  ],
  "correctedCode": "complete corrected and optimized code with comments",
  "summary": "3-4 sentence overall review covering quality, main issues, and key improvements",
  "promptToSave": "Your code has been reviewed and corrected. The improved version fixes X bugs and improves Y aspects. Would you like to save the corrected code to your editor?"
}

Rules:
- Return ONLY JSON, no markdown, no backticks, no extra text.
- If no bugs exist, return empty arrays for bugs, solutions.
- If no optimizations exist, return empty array.
- correctedCode must be the COMPLETE code, not just changed lines.
- severity must be exactly: low, medium, or high.
- grade must be: A+ A B+ B C+ C D F based on overall score.
- score must be integer between 1 and 10.
`,
        },
        {
          role: "user",
          content: `Language: ${language}

Code:
${numberedCode}`,
        },
      ],
      max_tokens: 8000,
      temperature: 0.1,
    });

    const content = response.choices[0].message.content.trim();
    const parsed = JSON.parse(content);
    return parsed;
  } catch (error) {
    console.error("Groq API error:", error.message);
    return {
      explanation: [],
      bugs: [],
      solutions: [],
      codeQuality: {
        score: 0,
        grade: "N/A",
        readability: { score: 0, feedback: "Review failed" },
        maintainability: { score: 0, feedback: "Review failed" },
        performance: { score: 0, feedback: "Review failed" },
        bestPractices: { score: 0, feedback: "Review failed" },
        codeSmells: [],
      },
      optimizations: [],
      correctedCode: code,
      summary: "AI review failed. Please try again.",
      promptToSave: "Review failed. Please try again.",
    };
  }
};

module.exports = { analyzeCode };
