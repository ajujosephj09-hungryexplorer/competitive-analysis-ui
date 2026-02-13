# Competitive Analysis – Production AI System

**Live demo:** https://competitive-analysis-ui.vercel.app

1) Overview

This repository demonstrates how to take an LLM powered workflow from prototype to production, with an explicit focus on product leadership, system design, and operational rigor.

The system exposes a public UI backed by serverless APIs and a structured n8n based AI agent pipeline that performs competitive analysis using search, evidence synthesis, reasoning, and strict output validation.


2) Why this exists

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


3) What this demonstrates (for AI product teams)

This system intentionally showcases capabilities expected of senior AI product and GM roles:
- Designing end to end AI systems
- Translating ambiguous user intent into structured machine workflows
- Enforcing schema guarantees on LLM outputs
- Separating user facing UX from model orchestration
- Introducing hard evaluation gates to prevent silent failures
- Making tradeoffs between speed, cost, and reliability

4) System Architecture

User (Browser UI)
  → Vercel Static UI
    → Vercel Serverless API (/api/compare)
      → AI workflow: n8n Production Webhook
        → Search + Evidence Shaping
        → LLM Reasoning Agent
        → Schema & Format Validation (Hard Gate)
      -> Structured JSON Response
  -> Rendered Comparison Table

5) AI workflow (fully implemented)

- Input normalization via webhook
- Parallel search for Company A and Company B
- Evidence shaping into LLM model consumable context
- LLM reasoning agent with explicit output instructions
- Strict schema & format validation (hard fail on invalid output)
- Deterministic JSON response to the UI

6) AI workflow (partially implemented - will be extended in next release. The idea was to release a base version)

- Evaluation depth beyond schema correctness
- Retry strategies on partial evidence
- Cost awareness and token budgeting
- Confidence scoring

7) Important Production considerations addressed

This system explicitly handles concerns that surface only in real deployments:

- CORS isolation and API boundary control
- LLM failure modes (invalid JSON, hallucinated structure)
- Hard stop evaluation gates vs silent degradation
- Separation of concerns between UX, orchestration, and reasoning
- Deployability without local infrastructure dependencies

8) What’s coming next (to complete the AI lifecycle)

- Evaluation Layer: Dataset comparisons & regression detection
- Safety & Governance: Policy based constraints & flagging for unsupported claims
- Observability: Structured logging of ai agent decisions
- AI Economics: Token budgetingv& cost per request monitoring


