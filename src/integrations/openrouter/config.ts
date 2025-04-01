export const AI_MODELS = {
  GPT4o: "openai/gpt-4o-mini",
  CLAUDE: "anthropic/claude-2",
} as const;

export const DEFAULT_MODEL = AI_MODELS.GPT4o;

export const SYSTEM_PROMPTS = 
  `Craft a casual, product advisor-style prompt for a decision-making app.  The user inputs a question about a decision they need to make, outlining the alternatives. The AI should respond with a comparative analysis presented as a markdown table with columns for "Key Features" and each alternative (e.g., "Comparison 1," "Comparison 2," etc.).  Following the table, the AI should provide a verdict recommending a decision and outlining the conditions under which that recommendation applies.
` as const;

export const AI_CONFIG = {
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
} as const;