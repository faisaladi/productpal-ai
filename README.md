# ProductPal AI - Product Management Companion

> **Project Status**: 🟡 `Completed Prototype / Demonstration`  
> **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Google Gemini API, OpenRouter API  
> **Architecture**: Client-side AI assistant designed for PMs to draft PRDs, user stories, feature specs, and customer interview scripts

An interactive AI-powered assistant built specifically for Product Managers to accelerate discovery, spec writing, and prioritization workflows.

---

## 🌟 Key Features

- **PRD & Spec Generation**: Guided prompts to turn rough ideas into structured Product Requirement Documents.
- **User Story & Acceptance Criteria Formatter**: Automatically generates BDD/Gherkin-style user stories and test scenarios.
- **Multi-Model LLM Backing**: Supports Google Gemini and OpenRouter model integrations with streaming output.
- **Customizable Prompt Framework**: Curated product management frameworks (Jobs-to-be-Done, RICE, MoSCoW, Lean Canvas).

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/faisaladi/productpal-ai.git
cd productpal-ai
npm install
```

### 2. Configure API Keys
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Google Gemini or OpenRouter API key:
```env
VITE_GOOGLE_AI_API_KEY="your_gemini_api_key"
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) (or the displayed Vite port) in your browser.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.
