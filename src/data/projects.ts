export interface ProjectParam {
  id: string;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji-free identifier for the icon
  params: ProjectParam[];
  estimate: (values: Record<string, number>) => {
    inputTokensPerRequest: number;
    outputTokensPerRequest: number;
    requestsPerDay: number;
    explanation: string;
  };
}

export const projectTemplates: ProjectTemplate[] = [
  // 1. Customer Support Chatbot
  {
    id: "support-chatbot",
    name: "Customer Support Chatbot",
    description:
      "An AI chatbot that handles customer questions, troubleshooting, and support tickets.",
    icon: "chat",
    params: [
      {
        id: "ticketsPerDay",
        label: "Conversations per day",
        description: "How many customer chats will the bot handle daily?",
        min: 1,
        max: 10000,
        step: 10,
        defaultValue: 100,
        unit: "conversations",
      },
      {
        id: "turnsPerConversation",
        label: "Messages per conversation",
        description:
          "Average back-and-forth messages in a single conversation (customer + bot combined)",
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 4,
        unit: "messages",
      },
      {
        id: "questionLength",
        label: "Average question length",
        description:
          "How long is a typical customer message? (1 = short, 5 = very detailed)",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 2,
        unit: "complexity",
      },
    ],
    estimate: (v) => {
      const systemPrompt = 500; // tokens for system instructions, brand voice, FAQ context
      const questionTokens = v.questionLength * 60; // 60-300 tokens per question
      const historyPerTurn = questionTokens * 0.5; // previous turns add to context
      const avgTurns = v.turnsPerConversation / 2; // half are bot responses
      const inputPerRequest =
        systemPrompt + questionTokens + historyPerTurn * (avgTurns - 1);
      const outputPerRequest = 150 + v.questionLength * 30; // 150-300 tokens response

      return {
        inputTokensPerRequest: Math.round(inputPerRequest),
        outputTokensPerRequest: Math.round(outputPerRequest),
        requestsPerDay: Math.round(v.ticketsPerDay * avgTurns),
        explanation: `Each conversation has ~${avgTurns.toFixed(0)} bot replies. The system prompt (${systemPrompt} tokens) plus growing conversation history means each reply uses ~${Math.round(inputPerRequest)} input tokens. The bot's response averages ~${Math.round(outputPerRequest)} tokens.`,
      };
    },
  },

  // 2. Content Generation
  {
    id: "content-generation",
    name: "Content Generation",
    description:
      "Generate blog posts, social media content, product descriptions, or marketing copy.",
    icon: "pencil",
    params: [
      {
        id: "piecesPerWeek",
        label: "Content pieces per week",
        description: "How many articles, posts, or descriptions do you need per week?",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 10,
        unit: "pieces",
      },
      {
        id: "wordCount",
        label: "Average word count",
        description: "How long should each piece be?",
        min: 50,
        max: 5000,
        step: 50,
        defaultValue: 800,
        unit: "words",
      },
      {
        id: "briefLength",
        label: "How detailed is your brief?",
        description:
          "How much context/instructions do you provide? (1 = short prompt, 5 = detailed brief with examples)",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: "detail level",
      },
    ],
    estimate: (v) => {
      const briefTokens = v.briefLength * 200; // 200-1000 tokens for instructions
      const outputTokens = Math.round(v.wordCount * 1.33); // ~1.33 tokens per word
      const requestsPerDay = Math.round((v.piecesPerWeek / 7) * 10) / 10;

      return {
        inputTokensPerRequest: briefTokens,
        outputTokensPerRequest: outputTokens,
        requestsPerDay: Math.max(1, Math.round(requestsPerDay)),
        explanation: `Each piece needs a ${briefTokens}-token brief/prompt and generates ~${outputTokens} tokens (~${v.wordCount} words) of content. At ${v.piecesPerWeek} pieces/week, that's ~${Math.max(1, Math.round(requestsPerDay))} requests/day.`,
      };
    },
  },

  // 3. Code Assistant
  {
    id: "code-assistant",
    name: "Code Assistant",
    description:
      "AI-powered coding help: code generation, debugging, code review, and refactoring.",
    icon: "code",
    params: [
      {
        id: "developers",
        label: "Number of developers",
        description: "How many people on your team will use the AI assistant?",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 5,
        unit: "developers",
      },
      {
        id: "queriesPerDev",
        label: "Queries per developer per day",
        description:
          "How often does each developer ask the AI for help? (autocomplete, questions, reviews)",
        min: 1,
        max: 200,
        step: 1,
        defaultValue: 30,
        unit: "queries",
      },
      {
        id: "contextSize",
        label: "Code context size",
        description:
          "How much surrounding code is sent with each query? (1 = single function, 5 = multiple files)",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: "context level",
      },
    ],
    estimate: (v) => {
      const systemPrompt = 300;
      const codeContext = v.contextSize * 800; // 800-4000 tokens of code
      const question = 100;
      const inputPerRequest = systemPrompt + codeContext + question;
      const outputPerRequest = 200 + v.contextSize * 150; // 200-950 tokens

      return {
        inputTokensPerRequest: Math.round(inputPerRequest),
        outputTokensPerRequest: Math.round(outputPerRequest),
        requestsPerDay: v.developers * v.queriesPerDev,
        explanation: `${v.developers} developers making ${v.queriesPerDev} queries/day each = ${v.developers * v.queriesPerDev} total requests/day. Each query sends ~${Math.round(inputPerRequest)} tokens of code context and receives ~${Math.round(outputPerRequest)} tokens of generated code/explanation.`,
      };
    },
  },

  // 4. Document Processing / RAG
  {
    id: "document-rag",
    name: "Document Processing & RAG",
    description:
      "Process, summarize, or answer questions about documents, reports, and knowledge bases.",
    icon: "document",
    params: [
      {
        id: "documentsPerDay",
        label: "Documents processed per day",
        description: "How many documents, reports, or files need processing daily?",
        min: 1,
        max: 1000,
        step: 1,
        defaultValue: 50,
        unit: "documents",
      },
      {
        id: "pagesPerDocument",
        label: "Average pages per document",
        description: "How long is a typical document?",
        min: 1,
        max: 100,
        step: 1,
        defaultValue: 10,
        unit: "pages",
      },
      {
        id: "queriesPerDoc",
        label: "Queries per document",
        description:
          "How many questions or operations per document? (1 = single summary, 5 = multiple extractions)",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 3,
        unit: "queries",
      },
    ],
    estimate: (v) => {
      const tokensPerPage = 500; // ~500 tokens per page of text
      const chunkSize = 2000; // RAG chunk size in tokens
      const chunksPerQuery = 4; // top-k retrieved chunks
      const systemPrompt = 400;
      const inputPerRequest = systemPrompt + chunkSize * chunksPerQuery; // retrieved context
      const outputPerRequest = 300 + v.queriesPerDoc * 50; // summary/answer

      // For very large docs, we also need to count embedding/chunking passes
      const totalDocTokens = v.pagesPerDocument * tokensPerPage;
      const chunksPerDoc = Math.ceil(totalDocTokens / chunkSize);

      return {
        inputTokensPerRequest: Math.round(inputPerRequest),
        outputTokensPerRequest: Math.round(outputPerRequest),
        requestsPerDay: v.documentsPerDay * v.queriesPerDoc,
        explanation: `Each document (~${v.pagesPerDocument} pages, ~${totalDocTokens.toLocaleString()} tokens) is split into ~${chunksPerDoc} chunks. Each query retrieves ${chunksPerQuery} relevant chunks (~${inputPerRequest.toLocaleString()} input tokens) and generates a ~${Math.round(outputPerRequest)}-token response. ${v.documentsPerDay} docs x ${v.queriesPerDoc} queries = ${v.documentsPerDay * v.queriesPerDoc} requests/day.`,
      };
    },
  },

  // 5. AI Agent / Multi-step Workflow
  {
    id: "ai-agent",
    name: "AI Agent / Multi-step Workflow",
    description:
      "AI agents that complete complex tasks autonomously: research, coding projects, data analysis, multi-step workflows.",
    icon: "robot",
    params: [
      {
        id: "tasksPerDay",
        label: "Tasks per day",
        description:
          "How many complex tasks or projects does the agent run daily?",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 10,
        unit: "tasks",
      },
      {
        id: "stepsPerTask",
        label: "Steps per task",
        description:
          "How many back-and-forth steps does a typical task require? (e.g., a website build might take 15-25 steps)",
        min: 1,
        max: 50,
        step: 1,
        defaultValue: 12,
        unit: "steps",
      },
      {
        id: "complexity",
        label: "Task complexity",
        description:
          "How complex are the tasks? (1 = simple lookup, 3 = moderate coding, 5 = full project build)",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: "complexity",
      },
    ],
    estimate: (v) => {
      // Agent context grows with each step (conversation history accumulates)
      const systemPrompt = 2000 * v.complexity; // 2K-10K for system prompt + tool definitions
      const avgContextPerStep = systemPrompt + (v.stepsPerTask / 2) * 500 * v.complexity;
      const outputPerStep = 300 + v.complexity * 200; // 300-1300 tokens per step

      // Total requests = tasks * steps
      const totalStepsPerDay = v.tasksPerDay * v.stepsPerTask;

      return {
        inputTokensPerRequest: Math.round(avgContextPerStep),
        outputTokensPerRequest: Math.round(outputPerStep),
        requestsPerDay: totalStepsPerDay,
        explanation: `Each task has ${v.stepsPerTask} steps where context grows as the conversation progresses. Average input per step is ~${Math.round(avgContextPerStep).toLocaleString()} tokens (system prompt + accumulated history). ${v.tasksPerDay} tasks x ${v.stepsPerTask} steps = ${totalStepsPerDay} API calls/day. This is similar to how AI coding assistants like Claude Code or Cursor work.`,
      };
    },
  },

  // 6. Translation
  {
    id: "translation",
    name: "Translation",
    description:
      "Translate text, documents, or product listings into multiple languages.",
    icon: "globe",
    params: [
      {
        id: "wordsPerDay",
        label: "Words to translate per day",
        description: "Total volume of text that needs translation daily",
        min: 100,
        max: 500000,
        step: 100,
        defaultValue: 5000,
        unit: "words",
      },
      {
        id: "targetLanguages",
        label: "Number of target languages",
        description: "How many languages do you need to translate into?",
        min: 1,
        max: 30,
        step: 1,
        defaultValue: 3,
        unit: "languages",
      },
      {
        id: "quality",
        label: "Translation quality",
        description:
          "1 = basic/rough translation, 3 = professional quality, 5 = specialized/technical with glossary",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: "quality level",
      },
    ],
    estimate: (v) => {
      const instructionTokens = 100 + v.quality * 100; // 200-600 for instructions + glossary
      const chunkSize = 1000; // words per request (to stay within context limits)
      const chunksPerDay = Math.ceil(v.wordsPerDay / chunkSize);
      const inputTokensPerChunk = Math.round(chunkSize * 1.33) + instructionTokens;
      const outputTokensPerChunk = Math.round(chunkSize * 1.5); // translation often slightly longer

      return {
        inputTokensPerRequest: inputTokensPerChunk,
        outputTokensPerRequest: outputTokensPerChunk,
        requestsPerDay: chunksPerDay * v.targetLanguages,
        explanation: `${v.wordsPerDay.toLocaleString()} words split into ${chunksPerDay} chunks, each translated into ${v.targetLanguages} languages = ${chunksPerDay * v.targetLanguages} requests/day. Each request sends ~${inputTokensPerChunk.toLocaleString()} tokens (source text + instructions) and receives ~${outputTokensPerChunk.toLocaleString()} tokens of translated text.`,
      };
    },
  },
];
