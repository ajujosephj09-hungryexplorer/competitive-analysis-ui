# Competitive Analysis – Production AI System

**Live demo:** https://competitive-analysis-ui.vercel.app

## 1. Overview

This repository demonstrates how to take an LLM powered workflow from prototype to production, with an explicit focus on product leadership, system design, and operational rigor.

The system exposes a public UI backed by serverless APIs and a structured n8n based AI agent pipeline that performs competitive analysis using search, evidence synthesis, reasoning, and strict output validation.

## 2. Why this exists

I have been trying to learn end to end AI system design, and most AI projects stop at:
- prompts
- single function demos

Real AI products require a lot more, including but not limited to the following and I couldn't find much help.
- orchestration
- reliability guarantees
- failure handling
- evaluation gates
- and production deployment discipline

This project is my attempt to demonstrate how AI systems are actually built and operated, and how product leaders must think across UX, architecture, safety, and economics simultaneously.

## 3. What this demonstrates (for AI product teams)

This system intentionally showcases capabilities expected of senior AI product and GM roles:
- Designing end to end AI systems
- Translating ambiguous user intent into structured machine workflows
- Enforcing schema guarantees on LLM outputs
- Separating user facing UX from model orchestration
- Introducing hard evaluation gates to prevent silent failures
- Making tradeoffs between speed, cost, and reliability

## 4. System Architecture

User (Browser UI)
  → Vercel Static UI
    → Vercel Serverless API (/api/compare)
      → AI workflow: n8n Production Webhook
        → Search + Evidence Shaping
        → LLM Reasoning Agent
        → Schema & Format Validation (Hard Gate)
      -> Structured JSON Response
  -> Rendered Comparison Table

## 5. Key Design Tradeoffs

This project intentionally treats AI product development as a system design problem.

The goal was not to use the most advanced model available, but rather the goal was to design a workflow where retrieval, reasoning, validation, structured output, cost control, and UI rendering work together.

### LLM Model Selection: Fit for Purpose

LLM model choice was treated as a product decision.

For this competitive analysis tool, the task is not open ended creative generation. The system needs to compare two companies using available evidence, return structured JSON, and avoid unsupported claims. The best model for this use case is therefore the model that produces useful, evidence grounded output at acceptable cost, latency, and reliability.

I tested the workflow using Gemini Flash and Gemini 3.1 Pro.

| Dimension | Gemini Flash | Gemini 3.1 Pro |
|---|---|---|
| Output style | Richer, broader, evidence packed | Concise and precise |
| Coverage | Better breadth across segments, products, and markets | More selective |
| Claim behavior | Fewer sharp claims when evidence was limited | More likely to produce precise claims |
| Risk profile | Better fit for broad evidence synthesis | Precision can create risk if evidence is thin |
| Cost profile | Lower cost | Higher cost |
| Product fit | Stronger fit for this workflow | Better fit for tasks needing concise precision |

The final choice was Gemini Flash.

The reason: this product benefits more from broad, evidence grounded synthesis than from premium model precision. In this workflow, the most expensive model was not automatically the best model. Precise claims can increase risk when the retrieved evidence does not clearly support the details.

The model is only one part of the system. The workflow also uses evidence shaping, strict output instructions, schema validation, and hard evaluation gates to reduce model risk.

### Other Product and System Tradeoffs

| Tradeoff | Decision | Rationale |
|---|---|---|
| Evidence breadth vs. precision | Prioritized broad evidence coverage with validation gates | Competitive analysis needs enough context, but unsupported claims must be controlled |
| Natural language vs. structured output | Enforced strict JSON | The UI and downstream validation require predictable structure |
| LLM reasoning vs. deterministic validation | Used the LLM for synthesis and code for validation | LLMs are useful for reasoning; deterministic checks are better for schema enforcement |
| n8n vs. fully custom backend | Used n8n for orchestration | Faster iteration, easier workflow visibility, and strong fit for agent workflow prototyping |
| Vercel/serverless vs. custom infrastructure | Used Vercel serverless APIs | Lower operational overhead and easier public deployment |
| User facing simplicity vs. backend complexity | Kept the UI simple while adding backend validation | The product should feel simple even when the workflow is sophisticated |
| Cost vs. quality | Chose the model that met the quality bar at lower cost | Production AI systems need sustainable unit economics, not just impressive outputs |

### Design Philosophy

This project separates responsibilities across retrieval, orchestration, model reasoning, schema validation, API handling, and UI rendering. That separation makes the system easier to test, debug, improve, and extend for future phases.

## 6. AI workflow (fully implemented)

- Input normalization via webhook
- Parallel search for Company A and Company B
- Evidence shaping into LLM model consumable context
- LLM reasoning agent with explicit output instructions
- Strict schema & format validation (hard fail on invalid output)
- Deterministic JSON response to the UI

## 7. AI workflow (partially implemented - will be extended in next release. The idea was to release a base version)

- Evaluation depth beyond schema correctness
- Retry strategies on partial evidence
- Cost awareness and token budgeting
- Confidence scoring

## 8. Important Production considerations addressed

This system explicitly handles concerns that surface only in real deployments:

- CORS isolation and API boundary control
- LLM failure modes (invalid JSON, hallucinated structure)
- Hard stop evaluation gates vs silent degradation
- Separation of concerns between UX, orchestration, and reasoning
- Deployability without local infrastructure dependencies

## 9. What’s coming next (to complete the AI lifecycle)

- Evaluation Layer: Dataset comparisons & regression detection
- Safety & Governance: Policy based constraints & flagging for unsupported claims
- Observability: Structured logging of ai agent decisions
- AI Economics: Token budgetingv& cost per request monitoring


