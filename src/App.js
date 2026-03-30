import React, { useState, useEffect, useRef } from "react";
import {
  Brain, GitBranch, Layers, BarChart3, ChevronDown, ChevronRight, Users,
  BookOpen, Code2, Zap, Target, Award, CheckCircle2, ArrowRight,
  ArrowDown, Menu, X, ExternalLink, Globe, Play, FileText,
  MessageSquare, Star, Eye, Rocket, GraduationCap,
  ChevronUp, Trophy, ClipboardCheck, BarChart, Presentation, CircleDot,
  Flame, Sun, Moon,
} from "lucide-react";

const ENROLL_URL = "https://topmate.io/datasense/2024678";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/IjnHTbNphYi7GjfSIdR4su";


/* ═══════════════ DATA ═══════════════ */

const FRAMEWORKS = [
  { name: "LangGraph", icon: GitBranch, sessions: "Sessions 1–4", count: 4, color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", tagline: "The Orchestration Runtime", points: ["StateGraph, nodes & edges", "Conditional branching & routing", "Persistence & checkpointing", "Streaming & subgraphs"] },
  { name: "LangChain v1.0", icon: Layers, sessions: "Sessions 5–10", count: 6, color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", tagline: "Production Agent Framework", points: ["Models, tools & create_agent", "Middleware & guardrails", "RAG & multi-agent systems", "MCP integration & deployment"] },
  { name: "Deep Agents", icon: Brain, sessions: "Session 11", count: 1, color: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD", tagline: "Harness-Level Architecture", points: ["Subagents & delegation", "Skills & sandboxes", "Filesystem backends", "Agent Client Protocol (ACP)"] },
  { name: "LangSmith", icon: BarChart3, sessions: "Session 12", count: 1, color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", tagline: "Observability & Evaluation", points: ["Tracing & monitoring", "LLM-as-judge evaluation", "Prompt playground & versioning", "Production dashboards & alerts"] },
];

const JOURNEY_STEPS = [
  { title: "Enroll & Onboard", desc: "Join the cohort, set up dev environment, meet your community", icon: Rocket, color: "#2563EB", bg: "#EFF6FF" },
  { title: "Attend Live Sessions", desc: "Every Sat & Sun, 8 AM IST. Each class 2-3 hours. Real code, real interaction.", icon: Play, color: "#059669", bg: "#ECFDF5" },
  { title: "Submit Assignments", desc: "Mandatory assignment after every session - no exceptions", icon: ClipboardCheck, color: "#7C3AED", bg: "#F5F3FF" },
  { title: "Get Detailed Feedback", desc: "Written feedback within 3 days - improve, resubmit, grow", icon: MessageSquare, color: "#D97706", bg: "#FFFBEB" },
  { title: "Track Your Progress", desc: "Scores tracked transparently - attendance, quality, engagement", icon: BarChart, color: "#EF4444", bg: "#FEF2F2" },
  { title: "Present Capstone LIVE", desc: "Build & present in front of a panel - recorded & evaluated", icon: Presentation, color: "#7C3AED", bg: "#F5F3FF" },
  { title: "Graduate & Launch", desc: "Certificate, portfolio piece, resume review, career guidance", icon: GraduationCap, color: "#059669", bg: "#ECFDF5" },
];

const CURRICULUM = [
  { week: 1, theme: "LangGraph Foundations", color: "#2563EB", sessions: [
    { n: 1, title: "Thinking in LangGraph - Mental Models for Orchestration", topics: ["LangGraph overview & philosophy", "Graphs: nodes, edges, state, message flow", "Workflows vs Agents", "LangGraph Studio setup"], tech: ["StateGraph", "Nodes & Edges", "State Management"] },
    { n: 2, title: "StateGraph Mastery - Conditional Logic & Routing", topics: ["State channels, reducers, annotations", "Conditional & dynamic routing", "Graph API vs Functional API", "Visual debugging in Studio"], tech: ["Conditional Edges", "Dynamic Routing", "Pydantic State"] },
  ], assignment: { title: "Assignment 1", tech: ["StateGraph", "Conditional Routing", "Cyclic Graphs", "Multi-node Pipelines"] } },
  { week: 2, theme: "LangGraph Advanced", color: "#2563EB", sessions: [
    { n: 3, title: "Persistence, Checkpointing & Durable Execution", topics: ["MemorySaver, SqliteSaver, PostgresSaver", "Durable execution for production", "Thread management", "Time travel debugging"], tech: ["Checkpointers", "Persistence", "Time Travel"] },
    { n: 4, title: "Human-in-the-Loop, Streaming & Subgraphs", topics: ["Interrupt patterns (before/after)", "HITL: approval, editing, escalation", "Token & event streaming", "Subgraph composition"], tech: ["Interrupts", "Streaming", "Subgraphs", "HITL"] },
  ], assignment: { title: "Assignment 2", tech: ["Persistence", "Time Travel", "HITL", "Streaming", "Subgraphs"] } },
  { week: 3, theme: "LangChain v1.0 Core", color: "#059669", sessions: [
    { n: 5, title: "LangChain v1.0 - Models, Messages & Tools", topics: ["v1.0 architecture on LangGraph", "init_chat_model: multi-provider", "@tool decorator & schemas", "create_agent API"], tech: ["init_chat_model", "@tool", "create_agent"] },
    { n: 6, title: "Middleware, Guardrails & Context Engineering", topics: ["PII, summarization, retry middleware", "Custom @dynamic_prompt", "Input/output guardrails", "Context engineering"], tech: ["Middleware", "Guardrails", "Context Engineering"] },
  ], assignment: { title: "Assignment 3", tech: ["Multi-provider Models", "Middleware Stack", "Guardrails", "Custom Tools"] } },
  { week: 4, theme: "RAG, Memory & Structured Output", color: "#059669", sessions: [
    { n: 7, title: "RAG Pipelines - Retrieval, Indexing & Evaluation", topics: ["Vector stores: Chroma, Pinecone, pgvector", "Hybrid search & reranking", "Multi-query retrieval", "RAG evaluation metrics"], tech: ["Hybrid Search", "Reranking", "RAG Evaluation"] },
    { n: 8, title: "Structured Output, Long-term Memory & Streaming", topics: ["with_structured_output & Pydantic", "Long-term memory backends", "Token & structured streaming", "Production UI patterns"], tech: ["Structured Output", "Long-term Memory", "Streaming"] },
  ], assignment: { title: "Assignment 4", tech: ["Hybrid Retrieval", "Structured Metadata", "Memory", "Streaming"] } },
  { week: 5, theme: "Multi-Agent Systems & MCP", color: "#059669", sessions: [
    { n: 9, title: "Multi-Agent Architecture & Coordination", topics: ["Supervisor & hierarchical patterns", "Agent communication & delegation", "Shared state & conflict resolution", "Real-world case studies"], tech: ["Supervisor Pattern", "Agent Teams", "Delegation"] },
    { n: 10, title: "MCP, Production Patterns & Deployment", topics: ["Model Context Protocol integration", "Caching, rate limiting, fallbacks", "Agent Chat UI", "LangGraph Platform deployment"], tech: ["MCP", "Caching", "Rate Limiting", "Deployment"] },
  ], assignment: { title: "Assignment 5", tech: ["Multi-agent", "MCP", "HITL", "Production Patterns"] } },
  { week: 6, theme: "Deep Agents, LangSmith & Capstone", color: "#7C3AED", sessions: [
    { n: 11, title: "Deep Agents - Harness-Level Architecture", topics: ["create_deep_agent & Harness pattern", "State, Store, Filesystem backends", "Subagents, skills, sandboxes", "CLI & Agent Client Protocol"], tech: ["Deep Agent Harness", "Subagents", "Sandboxes", "ACP"] },
    { n: 12, title: "LangSmith - Observability & Production Monitoring", topics: ["@traceable & run trees", "Latency, cost, token dashboards", "Evaluation & experiments", "Prompt playground & versioning"], tech: ["@traceable", "Monitoring", "LLM-as-Judge", "Prompt Versioning"] },
  ] },
];

const TRACKING = [
  { name: "Attendance", icon: Users, color: "#2563EB", bg: "#EFF6FF", desc: "Presence in live sessions" },
  { name: "Submission", icon: ClipboardCheck, color: "#059669", bg: "#ECFDF5", desc: "On-time assignment delivery" },
  { name: "Quality", icon: Star, color: "#D97706", bg: "#FFFBEB", desc: "Code quality & architecture" },
  { name: "Engagement", icon: Flame, color: "#EF4444", bg: "#FEF2F2", desc: "Questions & initiative" },
];

const CANDIDATES = [
  { rank: 1, name: "Arjun M.", overall: 868, att: 70, sub: 100, qual: 383, eng: 315 },
  { rank: 2, name: "Priya S.", overall: 820, att: 70, sub: 100, qual: 350, eng: 300 },
  { rank: 3, name: "Rahul K.", overall: 755, att: 65, sub: 100, qual: 320, eng: 270 },
  { rank: 4, name: "Neha D.", overall: 690, att: 60, sub: 90, qual: 290, eng: 250 },
  { rank: 5, name: "Vikram P.", overall: 610, att: 55, sub: 80, qual: 250, eng: 225 },
  { rank: 6, name: "Ananya R.", overall: 520, att: 50, sub: 70, qual: 200, eng: 200 },
];

const FAQS = [
  { q: "What are the prerequisites?", a: "Intermediate Python, basic understanding of LLMs and APIs, and familiarity with git. No prior LangChain experience needed - we start from the orchestration layer up." },
  { q: "What if I miss a live session?", a: "All sessions are recorded with lifetime access. But attendance is tracked and affects your score - we strongly encourage live participation." },
  { q: "Is this updated to LangChain v1.0?", a: "Yes - built entirely on the latest LangChain v1.0 with create_agent, middleware system, and LangGraph-native patterns. No deprecated code." },
  { q: "How does the capstone work?", a: "You build an enterprise AI platform over 2 weeks post-course, then present it LIVE in front of a panel audience. It's recorded and evaluated on architecture, code quality, and communication skills." },
  { q: "What tools do I need?", a: "Python 3.11+, VS Code, and an OpenAI or Anthropic API key (free tier works for most exercises). Full setup walkthrough in Session 1." },
  { q: "How are assignments evaluated?", a: "Each assignment has a detailed rubric covering correctness, code quality, architecture decisions, and production-readiness. Written feedback within 3 days of submission." },
  { q: "Is there a community or support?", a: "Yes - you get access to a private WhatsApp community and direct access to the instructor throughout the course and beyond." },
  { q: "What's the refund policy?", a: "Full refund within 7 days of course start if you've attended no more than 2 sessions. No questions asked." },
  { q: "Who is this course for?", a: "Developers and engineers who can write Python and want to build production AI agent systems. You don't need ML or deep learning experience - just Python, APIs, and the drive to build." },
  { q: "How is this different from YouTube tutorials?", a: "Tutorials show you how to call an API. This course teaches you how to architect, build, and ship agent systems. Every session has a mandatory assignment, your progress is tracked, and the capstone is a live presentation - not a passive video experience." },
  { q: "What will I be able to build after this course?", a: "Production-grade multi-agent systems with persistence, streaming, human-in-the-loop, RAG pipelines, MCP integration, and full observability. The kind of systems companies are hiring for right now." },
  { q: "When does Batch 1 start?", a: "Batch 1 is scheduled for late April / early May 2026. Classes are on Saturday and Sunday at 8 AM IST, 2-3 hours each. Join the WhatsApp group for the exact start date." },
  { q: "Will this help me get a job in AI?", a: "The course is designed to make you production-ready. The capstone serves as a real portfolio piece, and we provide resume review. The skills covered - LangGraph, LangChain, multi-agent systems, LangSmith - are exactly what companies are hiring for." },
  { q: "How much time do I need to commit per week?", a: "About 10-12 hours per week: 4-6 hours for live sessions (Sat & Sun, 2-3 hrs each) plus 4-6 hours for assignments and practice. Consistency matters more than cramming." },
  { q: "Do I get lifetime access?", a: "Yes - all session recordings, study notes, starter code, and solution repositories are yours forever. The community access also continues after the course ends." },
  { q: "Is this course live or pre-recorded?", a: "100% live. Every session is conducted in real-time with the instructor. You can ask questions, get instant clarification, and interact with fellow students. Recordings are available after for review." },
];

const INCLUDED = [
  { t: "12 live sessions (Sat & Sun, 8 AM IST)", i: Play },
  { t: "Lifetime recording access", i: Eye },
  { t: "5 graded assignments with feedback", i: FileText },
  { t: "Capstone project with mentorship", i: Rocket },
  { t: "Study notes & cheat sheets", i: BookOpen },
  { t: "Starter code & solution repos", i: Code2 },
  { t: "Private WhatsApp community", i: MessageSquare },
  { t: "Certificate of completion", i: Award },
  { t: "Private WhatsApp community", i: Users },
  { t: "Resume & portfolio review", i: Target },
];

const DETAILED_SYLLABUS = [
  { session: 1, week: 1, framework: "LangGraph", color: "#2563EB", title: "Thinking in LangGraph", details: [
    "LangGraph as low-level orchestration framework", "StateGraph construction & MessagesState", "Nodes as processing units, edges as connections",
    "Workflows vs Agents - when to use which", "Graph API vs Functional API tradeoffs", "LangGraph Studio for visual development",
  ] },
  { session: 2, week: 1, framework: "LangGraph", color: "#2563EB", title: "StateGraph Deep Dive", details: [
    "State channels, reducers & annotations", "Conditional edges & dynamic routing logic", "Sync, async & generator node functions",
    "TypedDict & Pydantic state schemas", "Graph compilation & execution flow", "Step-through debugging in Studio",
  ] },
  { session: 3, week: 2, framework: "LangGraph", color: "#2563EB", title: "Persistence & Durable Execution", details: [
    "Checkpointers: MemorySaver, SqliteSaver, PostgresSaver", "Durable execution - survive failures & restarts", "Thread management for multi-conversation state",
    "Time travel: replay, fork & branch execution history", "Short-term working memory for ongoing reasoning", "Long-term memory persistence across sessions",
  ] },
  { session: 4, week: 2, framework: "LangGraph", color: "#2563EB", title: "HITL, Streaming & Subgraphs", details: [
    "Human-in-the-loop: inspect & modify agent state", "Interrupt patterns: before, after, custom breakpoints", "Streaming: token-by-token, events, state diffs",
    "Subgraphs: composition, shared state, encapsulation", "Application structure & project layout", "Testing strategies for graph-based agents",
  ] },
  { session: 5, week: 3, framework: "LangChain", color: "#059669", title: "LangChain v1.0 Architecture", details: [
    "LangChain as prebuilt agent architecture on LangGraph", "init_chat_model: OpenAI, Anthropic, Google & more", "Standard model interface across providers",
    "Message types: Human, AI, System, Tool messages", "@tool decorator with structured schemas", "create_agent: the standard agent builder",
  ] },
  { session: 6, week: 3, framework: "LangChain", color: "#059669", title: "Middleware & Guardrails", details: [
    "Middleware pipeline between user and model", "Prebuilt: PII masking, summarization, retry, HITL", "Custom middleware with @dynamic_prompt",
    "Input validation & output filtering guardrails", "Context engineering & prompt design patterns", "Runtime configuration & dynamic behavior",
  ] },
  { session: 7, week: 4, framework: "LangChain", color: "#059669", title: "RAG Pipelines", details: [
    "RAG architecture: indexing → retrieval → generation", "Document loaders & text splitters", "Vector stores: Chroma, Pinecone, Weaviate, pgvector",
    "Hybrid search & reranking strategies", "Multi-query retrieval & contextual compression", "RAG evaluation: faithfulness, relevance, completeness",
  ] },
  { session: 8, week: 4, framework: "LangChain", color: "#059669", title: "Structured Output & Memory", details: [
    "with_structured_output & JSON mode", "Pydantic models for output schema validation", "Long-term memory: preferences, patterns, cross-session",
    "Memory backends: in-memory, vector store, graph", "Token streaming & structured streaming", "Building responsive production UIs",
  ] },
  { session: 9, week: 5, framework: "LangChain", color: "#059669", title: "Multi-Agent Systems", details: [
    "Supervisor, hierarchical & collaborative patterns", "Agent-to-agent communication & delegation", "Shared state & conflict resolution",
    "Hierarchical teams: managers, workers, specialists", "Result aggregation & consensus mechanisms", "Real-world multi-agent case studies",
  ] },
  { session: 10, week: 5, framework: "LangChain", color: "#059669", title: "MCP & Production Deployment", details: [
    "Model Context Protocol: agents ↔ external tools", "MCP servers & clients: build & consume services", "Production patterns: caching, rate limiting, fallbacks",
    "Agent Chat UI for conversational interfaces", "LangGraph Platform deployment", "Cloud, self-hosted & hybrid options",
  ] },
  { session: 11, week: 6, framework: "Deep Agents", color: "#7C3AED", title: "Harness Architecture", details: [
    "create_deep_agent SDK & agent harness pattern", "Built-in tool calling & write_todos planning", "File system tools: ls, read_file, write_file, edit_file",
    "Pluggable backends: in-memory, local disk, LangGraph store", "Subagent spawning with built-in task tool", "Sandboxes: Modal, Daytona, Deno for safe execution",
    "Long-term memory via LangGraph Memory Store", "CLI: interactive & headless (-n flag) modes",
  ] },
  { session: 12, week: 6, framework: "LangSmith", color: "#D97706", title: "Observability & Evaluation", details: [
    "@traceable decorator & run tree visualization", "Monitoring: latency, cost, token usage dashboards", "Evaluation: datasets, experiments, custom evaluators",
    "Evaluator types: heuristic, LLM-as-judge, human, pairwise", "Prompt Playground with built-in versioning", "Fleet: no-code visual agent design",
    "Studio: visual development interface", "Deployment: managed cloud, self-hosted, HIPAA/SOC2 compliant",
  ] },
];

const NUMBERS = [
  { value: "24+", label: "Hours of Live Training", color: "#2563EB" },
  { value: "12", label: "Hands-on Projects", color: "#059669" },
  { value: "80+", label: "Topics Covered", color: "#7C3AED" },
  { value: "4", label: "Frameworks Mastered", color: "#D97706" },
  { value: "5", label: "Graded Assignments", color: "#EF4444" },
  { value: "1", label: "Live Capstone Presentation", color: "var(--tx)" },
];

/* ═══════════════ CSS ═══════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);transition:background .3s,color .3s}
body{overflow-x:hidden}
::selection{background:#2563EB;color:#fff}

/* ── Theme vars ── */
:root{--bg:#FFFFFF;--bg2:#F8FAFC;--bg3:#F1F5F9;--bgc:#FFFFFF;--tx:#0F172A;--tx2:#475569;--tx3:#64748B;--tx4:#94A3B8;--bd:#E2E8F0;--bd2:#F1F5F9;--hero-bg:linear-gradient(180deg,#EFF6FF,#fff);--nav-bg:rgba(255,255,255,.95);--mob-bg:rgba(255,255,255,.98);--syl-bg:#EFF6FF;--cap-bg:linear-gradient(135deg,#F5F3FF,#EFF6FF)}
[data-theme="dark"]{--bg:#0F172A;--bg2:#1E293B;--bg3:#334155;--bgc:#1E293B;--tx:#F1F5F9;--tx2:#CBD5E1;--tx3:#94A3B8;--tx4:#64748B;--bd:#475569;--bd2:#334155;--hero-bg:linear-gradient(180deg,#1E293B,#0F172A);--nav-bg:rgba(15,23,42,.95);--mob-bg:rgba(15,23,42,.98);--syl-bg:#1E293B;--cap-bg:linear-gradient(135deg,#1E1B4B,#1E293B)}
[data-theme="dark"] .card{background:var(--bgc);border-color:var(--bd)}
[data-theme="dark"] .card:hover{border-color:#3B82F6}
[data-theme="dark"] .j-card{background:var(--bg2)!important}
[data-theme="dark"] .wk{background:var(--bgc);border-color:var(--bd)}
[data-theme="dark"] .ss{background:var(--bg2);border-color:var(--bd2)}
[data-theme="dark"] .fq{background:var(--bgc);border-color:var(--bd)}
[data-theme="dark"] .price{background:var(--bgc);border-color:#3B82F6}
[data-theme="dark"] .inst{background:var(--bgc);border-color:var(--bd)}
[data-theme="dark"] .num-card{background:var(--bgc);border-color:var(--bd)}
[data-theme="dark"] .tbl{border-color:var(--bd)}
[data-theme="dark"] .tbl th{background:var(--bg3)}
[data-theme="dark"] .tbl td{border-color:var(--bd2)}
[data-theme="dark"] .syl{border-color:var(--bd)}
[data-theme="dark"] .syl td{background:var(--bgc)}
[data-theme="dark"] .syl tbody tr:nth-child(even) td{background:var(--bg2)}
[data-theme="dark"] .cap{background:var(--bg2);border-color:#7C3AED}
[data-theme="dark"] .asgn{background:var(--bg2)!important;border-color:var(--bd)!important}
[data-theme="dark"] .tech{background:var(--bg2)!important}
[data-theme="dark"] strong{color:var(--tx)!important}

.wrap{max-width:1280px;margin:0 auto;padding:0 40px}
@media(max-width:600px){.wrap{padding:0 16px}}

.sec{padding:80px 0}
@media(max-width:600px){.sec{padding:56px 0}}
.sec-gray{background:var(--bg2)}
.sec-blue{background:var(--syl-bg)}

.label{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.h2{font-size:38px;font-weight:900;line-height:1.15;margin-bottom:14px;color:var(--tx)}
@media(max-width:600px){.h2{font-size:28px}}
.sub{font-size:16px;color:var(--tx3);line-height:1.65;max-width:560px}
.grad{background:linear-gradient(135deg,#2563EB,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── Top bar ── */
.topbar{position:fixed;top:0;left:0;right:0;z-index:101;background:#059669;padding:8px 16px;text-align:center;font-size:12px;color:#fff;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}
.topbar a{color:#fff;text-decoration:none;background:rgba(255,255,255,.2);padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;transition:background .15s;display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
.topbar a:hover{background:rgba(255,255,255,.35)}

/* ── Nav ── */
.nav{position:fixed;top:36px;left:0;right:0;z-index:100;padding:10px 0;background:var(--nav-bg);backdrop-filter:blur(16px);border-bottom:1px solid var(--bd)}
@media(max-width:600px){.nav{top:52px}}
.nav-in{display:flex;align-items:center;justify-content:space-between}
.nav-l{display:flex;align-items:center;gap:20px}
.nav-l a{color:var(--tx3);text-decoration:none;font-size:13px;font-weight:500;transition:color .15s}
.nav-l a:hover{color:var(--tx)}
.btn{display:inline-flex;align-items:center;gap:7px;padding:10px 22px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .15s;border:none}
.btn-p{background:#2563EB;color:#fff!important;font-weight:800}
a.btn-p{color:#fff!important;text-decoration:none}
.btn-p:hover{background:#1D4ED8;transform:translateY(-1px);box-shadow:0 6px 20px rgba(37,99,235,.25)}
.btn-o{background:var(--bgc);color:var(--tx);border:1.5px solid var(--bd)}
.btn-o:hover{border-color:#2563EB;color:#2563EB}
.btn-s{padding:8px 16px;font-size:12px;border-radius:8px}

/* ── Theme toggle ── */
.theme-btn{background:none;border:1.5px solid var(--bd);border-radius:8px;padding:6px 8px;cursor:pointer;color:var(--tx2);display:flex;align-items:center;transition:all .15s}
.theme-btn:hover{border-color:#2563EB;color:#2563EB}

/* ── Seat counter ── */
.seat-bar{background:linear-gradient(135deg,#EF4444,#DC2626);color:#fff;border-radius:12px;padding:14px 20px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:14px;font-weight:700;margin-top:20px;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.85}}
.seat-dot{width:10px;height:10px;border-radius:50%;background:#fff;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

/* ── Hero ── */
.hero{padding:130px 0 70px;background:var(--hero-bg);position:relative;overflow:hidden}
@media(max-width:600px){.hero{padding:110px 0 50px}}
.hero-dots{position:absolute;inset:0;opacity:.3;background-image:radial-gradient(var(--tx4) 1px,transparent 1px);background-size:28px 28px;mask-image:radial-gradient(ellipse 50% 50% at 50% 30%,#000,transparent);-webkit-mask-image:radial-gradient(ellipse 50% 50% at 50% 30%,#000,transparent)}
.hero-g{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;position:relative;z-index:1}
@media(max-width:900px){.hero-g{grid-template-columns:1fr;text-align:center}.hero-r{margin-top:24px}}
@media(max-width:600px){.hero h1{font-size:36px!important}}
.badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:50px;font-size:12px;font-weight:600}

/* ── Grids ── */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
@media(max-width:900px){.g4,.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g4,.g3,.g2{grid-template-columns:1fr}}

.card{border:1.5px solid var(--bd);border-radius:16px;padding:28px;background:var(--bgc);transition:all .2s}
@media(max-width:600px){.card{padding:20px}}
.card:hover{border-color:#3B82F6;box-shadow:0 8px 24px rgba(0,0,0,.08);transform:translateY(-3px)}

/* ── Numbers ── */
.nums{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
@media(max-width:900px){.nums{grid-template-columns:repeat(3,1fr)}}
@media(max-width:500px){.nums{grid-template-columns:repeat(2,1fr)}}
.num-card{text-align:center;padding:28px 12px;border-radius:16px;background:var(--bgc);border:1.5px solid var(--bd);transition:all .2s;position:relative;overflow:hidden}
.num-card:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.num-v{font-size:36px;font-weight:900;line-height:1}
@media(max-width:600px){.num-v{font-size:28px}}
.num-l{font-size:12px;color:var(--tx2);margin-top:8px;font-weight:600;line-height:1.3}

/* ── About ── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
@media(max-width:768px){.about-grid{grid-template-columns:1fr}}

/* ── Syllabus table ── */
.syl{width:100%;border-collapse:separate;border-spacing:0;border:2px solid var(--tx);border-radius:16px;overflow:hidden}
.syl th{background:#0F172A;padding:14px 16px;text-align:left;font-size:11px;font-weight:700;color:#F8FAFC;text-transform:uppercase;letter-spacing:.8px;white-space:nowrap}
.syl td{padding:14px 16px;border-top:1.5px solid var(--bd);font-size:13px;color:var(--tx);vertical-align:top;background:var(--bgc)}
.syl tbody tr:nth-child(even) td{background:var(--bg2)}
.syl tbody tr:hover td{background:var(--syl-bg)}
.syl .fw-badge{display:inline-block;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700;white-space:nowrap}
.syl-detail{font-size:12px;color:var(--tx2);line-height:1.6}
.syl-expand{cursor:pointer;color:#2563EB;font-size:12px;font-weight:700;background:none;border:none;padding:4px 0;margin-top:6px}
@media(max-width:768px){.syl th:nth-child(1),.syl td:nth-child(1),.syl th:nth-child(2),.syl td:nth-child(2){display:none}}

/* ── Journey ── */
.j-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.j-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:920px;margin:16px auto 0}
@media(max-width:900px){.j-grid,.j-grid-3{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.j-grid,.j-grid-3{grid-template-columns:1fr}}
.j-card{border-radius:16px;padding:20px;text-align:center;border:1.5px solid transparent;transition:all .2s;position:relative}
.j-card:hover{border-color:var(--bd);box-shadow:0 4px 16px rgba(0,0,0,.05);transform:translateY(-2px)}
.j-num{position:absolute;top:10px;right:14px;font-size:36px;font-weight:900;opacity:.08;line-height:1}

/* ── Curriculum ── */
.wk{border:1.5px solid var(--bd);border-radius:14px;margin-bottom:12px;overflow:hidden;background:var(--bgc);transition:box-shadow .2s}
.wk:hover{box-shadow:0 2px 12px rgba(0,0,0,.05)}
.wk-h{padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;user-select:none;transition:background .15s}
.wk-h:hover{background:var(--bg2)}
.ss{border:1.5px solid var(--bd2);border-radius:12px;padding:18px;margin-bottom:10px;background:var(--bg2)}
.tech{display:inline-flex;align-items:center;padding:4px 10px;border-radius:7px;font-size:11px;font-weight:600;margin:2px}
.asgn{border-radius:12px;padding:16px;margin-top:8px;display:flex;align-items:flex-start;gap:10px}

/* ── Table ── */
.tbl{width:100%;border-collapse:separate;border-spacing:0;border:1.5px solid var(--bd);border-radius:14px;overflow:hidden}
.tbl th{background:var(--bg3);padding:12px 16px;text-align:left;font-size:12px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.5px}
.tbl td{padding:12px 16px;border-top:1px solid var(--bd2);font-size:14px;color:var(--tx2)}
.tbl tbody tr:hover td{background:var(--bg2)}
.rk{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;font-weight:800;font-size:13px}

/* ── Price ── */
.price{max-width:520px;margin:0 auto;padding:40px;border:2px solid #2563EB;border-radius:24px;background:var(--bgc);text-align:center;position:relative;overflow:hidden}
@media(max-width:600px){.price{padding:28px 20px}}
.price::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#2563EB,#059669,#7C3AED)}
.inc{display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left;margin:24px 0}
@media(max-width:520px){.inc{grid-template-columns:1fr}}

/* ── FAQ ── */
.fq{border:1.5px solid var(--bd);border-radius:12px;margin-bottom:10px;overflow:hidden;background:var(--bgc)}
.fq-q{padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;font-weight:600;font-size:14px;user-select:none;color:var(--tx);transition:background .15s}
.fq-q:hover{background:var(--bg2)}
.fq-a{padding:0 20px 16px;color:var(--tx3);line-height:1.7;font-size:14px}

/* ── Cap ── */
.cap{border:2px solid #7C3AED;border-radius:20px;padding:32px;background:var(--cap-bg);margin-top:28px}
@media(max-width:600px){.cap{padding:20px}}

/* ── Instructor ── */
.inst{display:flex;align-items:center;gap:36px;max-width:700px;margin:0 auto;background:var(--bgc);border:1.5px solid var(--bd);border-radius:20px;padding:36px}
@media(max-width:640px){.inst{flex-direction:column;text-align:center;padding:28px 20px}}
.av{width:120px;height:120px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#fff}

/* ── Footer ── */
footer{border-top:1.5px solid var(--bd);padding:32px 0}
footer a{color:var(--tx4);text-decoration:none;font-size:13px;transition:color .15s}
footer a:hover{color:#2563EB}

/* ── Mobile menu ── */
.mob{position:fixed;inset:0;background:var(--mob-bg);backdrop-filter:blur(16px);z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}
.mob a{color:var(--tx);text-decoration:none;font-size:18px;font-weight:700}
@media(max-width:900px){.nav-l{display:none!important}.mob-b{display:flex!important}}
@media(max-width:600px){.topbar{font-size:11px;gap:6px}}
`;

/* ═══════════════ HOOKS ═══════════════ */
function useAnim() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; } }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll("[data-a]").forEach((el) => {
      el.style.opacity = "0"; el.style.transform = "translateY(24px)";
      el.style.transition = "opacity .55s ease, transform .55s ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════ SEAT COUNTER ═══════════════ */
function getSeatsLeft() {
  // Start date: April 1, 2026. Start with 30 seats. Reduce by 1 per day.
  const start = new Date("2026-04-01");
  const now = new Date();
  const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const seats = Math.max(5, 30 - Math.max(0, days));
  return seats;
}

/* ═══════════════ SECTIONS ═══════════════ */

function TopBar() {
  return (
    <div className="topbar">
      <span>Batch 1 starts late April / early May 2026 - Sat & Sun, 8 AM IST</span>
      <a href={WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer">
        <MessageSquare size={12} /> Join WhatsApp Group
      </a>
    </div>
  );
}

function Nav({ dark, toggleDark }) {
  const [mob, setMob] = useState(false);
  const links = [
    { l: "About", h: "#about" }, { l: "Curriculum", h: "#curriculum" },
    { l: "Journey", h: "#journey" }, { l: "Tracking", h: "#tracking" }, { l: "Pricing", h: "#pricing" }, { l: "FAQ", h: "#faq" },
  ];
  return (
    <>
      <nav className="nav">
        <div className="wrap nav-in">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Brain size={24} color="#2563EB" />
            <span style={{ fontSize: 17, fontWeight: 800, color: "var(--tx)" }}>DataSense</span>
            <span style={{ fontSize: 13, color: "var(--tx4)", fontWeight: 500 }}>/ Agent Builder</span>
          </div>
          <div className="nav-l">
            {links.map((l) => <a key={l.h} href={l.h}>{l.l}</a>)}
            <button className="theme-btn" onClick={toggleDark} title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={ENROLL_URL} className="btn btn-p btn-s">Enroll Now</a>
          </div>
          <div style={{ display: "none", alignItems: "center", gap: 8 }} className="mob-b">
            <button className="theme-btn" onClick={toggleDark}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMob(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--tx)" }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      {mob && (
        <div className="mob">
          <button onClick={() => setMob(false)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", color: "var(--tx)" }}><X size={26} /></button>
          {links.map((l) => <a key={l.h} href={l.h} onClick={() => setMob(false)}>{l.l}</a>)}
          <a href={ENROLL_URL} className="btn btn-p" style={{ marginTop: 8 }}>Enroll Now</a>
        </div>
      )}
    </>
  );
}

function SeatCounter() {
  const seats = getSeatsLeft();
  return (
    <div className="seat-bar">
      <div className="seat-dot" />
      <span>Only {seats} seats left for Batch 1</span>
      <a href={ENROLL_URL} style={{ color: "#fff", textDecoration: "underline", fontWeight: 800 }}>Enroll Now</a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-dots" />
      <div className="wrap">
        <div className="hero-g">
          <div>
            <div className="badge" style={{ background: "var(--syl-bg)", color: "#2563EB", border: "1px solid #BFDBFE", marginBottom: 20 }}>
              <Zap size={13} /> Batch 1 - Starts Late April / Early May 2026
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 18, color: "var(--tx)" }}>
              <span className="grad">Agent Builder</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--tx)", lineHeight: 1.5, marginBottom: 8, fontWeight: 600 }}>
              Build production AI agents with LangChain & LangGraph
            </p>
            <p style={{ fontSize: 16, color: "var(--tx3)", lineHeight: 1.65, marginBottom: 28, maxWidth: 480 }}>
              Master LangGraph, LangChain v1.0, Deep Agents & LangSmith in 6 weeks. Ship agents, not demos.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              <a href={ENROLL_URL} className="btn btn-p" style={{ fontSize: 15, padding: "13px 28px" }}>Enroll Now <ArrowRight size={16} /></a>
              <a href="#curriculum" className="btn btn-o" style={{ fontSize: 15, padding: "13px 28px" }}>View Curriculum <ArrowDown size={16} /></a>
            </div>
            <p style={{ fontSize: 13, color: "#059669", fontWeight: 600, marginBottom: 24 }}>
              Use code <span style={{ background: "#0F172A", color: "#fff", padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, fontWeight: 800 }}>AGENTICAI</span> for 45% off
            </p>
            <SeatCounter />
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap", marginTop: 24 }}>
              {[{ v: "6", l: "Weeks" }, { v: "12", l: "Sessions" }, { v: "5", l: "Assignments" }, { v: "1", l: "Capstone" }].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: "var(--tx)" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "var(--tx4)", fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-r" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={process.env.PUBLIC_URL + "/course-banner.png"}
              alt="Agent Builder 2026"
              style={{ width: "100%", maxWidth: 420, borderRadius: 24, boxShadow: "0 12px 40px rgba(0,0,0,.12)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NumbersBar() {
  const r = useAnim();
  return (
    <section className="sec sec-gray" ref={r} style={{ padding: "56px 0" }}>
      <div className="wrap">
        <div className="nums" data-a>
          {NUMBERS.map((n, i) => (
            <div key={i} className="num-card" style={{ borderTop: `4px solid ${n.color}` }}>
              <div className="num-v" style={{ color: n.color }}>{n.value}</div>
              <div className="num-l">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SyllabusTable() {
  const [expanded, setExpanded] = useState({});
  const r = useAnim();
  return (
    <section className="sec sec-blue" id="syllabus" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "var(--tx)" }}>Detailed Syllabus</p>
          <h2 className="h2">Session-by-Session <span className="grad">Breakdown</span></h2>
          <p className="sub" style={{ margin: "0 auto 24px" }}>Every topic sourced from official documentation. Click any row to see full details.</p>
          <a href={ENROLL_URL} className="btn btn-p">Enroll Now <ArrowRight size={15} /></a>
        </div>
        <div data-a style={{ overflowX: "auto" }}>
          <table className="syl">
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th style={{ width: 50 }}>Week</th>
                <th style={{ width: 110 }}>Framework</th>
                <th>Session Title</th>
                <th style={{ width: 320 }}>Key Topics (from official docs)</th>
              </tr>
            </thead>
            <tbody>
              {DETAILED_SYLLABUS.map((s) => (
                <tr key={s.session}>
                  <td style={{ fontWeight: 800, color: s.color, fontSize: 16 }}>{s.session}</td>
                  <td style={{ fontWeight: 600 }}>{s.week}</td>
                  <td>
                    <span className="fw-badge" style={{ background: `${s.color}12`, color: s.color }}>{s.framework}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--tx)", fontSize: 14 }}>{s.title}</td>
                  <td>
                    <div className="syl-detail">
                      {(expanded[s.session] ? s.details : s.details.slice(0, 3)).map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 3, alignItems: "flex-start" }}>
                          <CheckCircle2 size={11} color={s.color} style={{ flexShrink: 0, marginTop: 3 }} />
                          <span>{d}</span>
                        </div>
                      ))}
                      {s.details.length > 3 && (
                        <button className="syl-expand" onClick={() => setExpanded((p) => ({ ...p, [s.session]: !p[s.session] }))}>
                          {expanded[s.session] ? "Show less ▲" : `+${s.details.length - 3} more ▼`}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div data-a style={{ textAlign: "center", marginTop: 32 }}>
          <a href={ENROLL_URL} className="btn btn-p" style={{ fontSize: 16, padding: "14px 32px" }}>
            Enroll Now - Limited Seats <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutCourse() {
  const r = useAnim();
  return (
    <section className="sec" id="about" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "#2563EB" }}>About the Course</p>
          <h2 className="h2">What is <span className="grad">Agent Builder?</span></h2>
          <p className="sub" style={{ margin: "0 auto" }}>A 6-week intensive where you go from writing Python scripts to building, deploying, and monitoring multi-agent AI systems that run in production.</p>
        </div>
        <div data-a className="about-grid">

          <div className="card" style={{ borderTop: "4px solid #2563EB" }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "var(--tx)" }}>What you'll actually learn</h3>
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7, marginBottom: 12 }}>
              You start where it matters - the <strong style={{ color: "var(--tx)" }}>orchestration layer</strong>. LangGraph teaches you how agents actually work under the hood: state management, graph execution, persistence, streaming, and human-in-the-loop patterns. Most courses skip this. We don't.
            </p>
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7, marginBottom: 12 }}>
              Then you move to <strong style={{ color: "var(--tx)" }}>LangChain v1.0</strong> - agents with tools, middleware, guardrails, RAG pipelines, structured output, long-term memory, multi-agent coordination, and MCP integration.
            </p>
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7 }}>
              Final week: <strong style={{ color: "var(--tx)" }}>Deep Agents</strong> for harness-level control with subagent delegation and sandboxed execution. <strong style={{ color: "var(--tx)" }}>LangSmith</strong> for tracing every decision, evaluating quality, and monitoring production costs.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="card" style={{ borderTop: "4px solid #059669" }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "var(--tx)" }}>How the course works</h3>
              <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7, marginBottom: 12 }}>
                12 live sessions. Every Saturday & Sunday at 8 AM IST, 2-3 hours each. Every session is followed by a <strong style={{ color: "var(--tx)" }}>mandatory assignment</strong> that gets graded with detailed written feedback.
              </p>
              <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7 }}>
                Your attendance, submission rate, code quality, and engagement are <strong style={{ color: "var(--tx)" }}>tracked and ranked</strong> against the cohort - transparently. The course ends with a <strong style={{ color: "var(--tx)" }}>live capstone presentation</strong> in front of a panel. Recorded. Evaluated. Portfolio-ready.
              </p>
            </div>

            <div className="card" style={{ borderTop: "4px solid #7C3AED" }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "var(--tx)" }}>Who is this for</h3>
              <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7 }}>
                You can write Python. You understand what an API call is. You want to build AI systems that actually work in production - not just notebook demos. <strong style={{ color: "var(--tx)" }}>No ML background needed. No prior LangChain experience needed.</strong>
              </p>
            </div>
          </div>
        </div>

        <div data-a style={{ marginTop: 24 }}>
          <div className="card" style={{ borderTop: "4px solid #D97706", textAlign: "center", padding: 32 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 12, color: "var(--tx)" }}>The Stack</h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 15, fontWeight: 600 }}>
              <span style={{ color: "#2563EB", background: "#EFF6FF", padding: "8px 18px", borderRadius: 10, border: "1px solid #BFDBFE" }}>LangGraph</span>
              <span style={{ color: "var(--tx4)", fontSize: 20 }}>→</span>
              <span style={{ color: "#059669", background: "#ECFDF5", padding: "8px 18px", borderRadius: 10, border: "1px solid #A7F3D0" }}>LangChain v1.0</span>
              <span style={{ color: "var(--tx4)", fontSize: 20 }}>→</span>
              <span style={{ color: "#7C3AED", background: "#F5F3FF", padding: "8px 18px", borderRadius: 10, border: "1px solid #C4B5FD" }}>Deep Agents</span>
              <span style={{ color: "var(--tx4)", fontSize: 20 }}>→</span>
              <span style={{ color: "#D97706", background: "#FFFBEB", padding: "8px 18px", borderRadius: 10, border: "1px solid #FDE68A" }}>LangSmith</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--tx3)", marginTop: 14 }}>Four frameworks. One logical sequence. The complete production agent stack.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frameworks() {
  const r = useAnim();
  return (
    <section className="sec" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "#2563EB" }}>What You'll Master</p>
          <h2 className="h2">4 Frameworks. <span className="grad">1 Ecosystem.</span></h2>
          <p className="sub" style={{ margin: "0 auto" }}>A progressive, foundation-first journey through the entire LangChain stack.</p>
        </div>
        <div className="g4" data-a>
          {FRAMEWORKS.map((f) => (
            <div key={f.name} className="card" style={{ borderColor: f.border, borderTop: `4px solid ${f.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "var(--tx)" }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: f.color, fontWeight: 600 }}>{f.tagline}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {f.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tx2)", alignItems: "center" }}>
                    <CircleDot size={12} color={f.color} style={{ flexShrink: 0 }} /> {p}
                  </div>
                ))}
              </div>
              <div style={{ padding: "8px 0", borderTop: `1px solid ${f.border}`, textAlign: "center", fontSize: 13, fontWeight: 700, color: f.color }}>
                {f.sessions}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  const r = useAnim();
  return (
    <section className="sec sec-blue" id="journey" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "#059669" }}>Your Journey With DataSense</p>
          <h2 className="h2">From Enrollment to <span className="grad">Graduation</span></h2>
          <p className="sub" style={{ margin: "0 auto" }}>Every step is designed to make you a better AI engineer - not just watch videos.</p>
        </div>
        <div className="j-grid" data-a>
          {JOURNEY_STEPS.slice(0, 4).map((s, i) => (
            <div key={i} className="j-card" style={{ background: s.bg }}>
              <div className="j-num">{i + 1}</div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--bgc)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--tx)", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "var(--tx3)", lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div data-a className="j-grid-3">
          {JOURNEY_STEPS.slice(4).map((s, i) => (
            <div key={i} className="j-card" style={{ background: s.bg }}>
              <div className="j-num">{i + 5}</div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--bgc)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--tx)", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "var(--tx3)", lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const [ow, setOw] = useState({});
  const r = useAnim();
  return (
    <section className="sec" id="curriculum" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "#7C3AED" }}>Full Curriculum</p>
          <h2 className="h2">12 Sessions. 6 Weeks. <span className="grad">Zero Fluff.</span></h2>
          <p className="sub" style={{ margin: "0 auto" }}>Click each week to explore session topics and technologies you'll use.</p>
        </div>
        <div data-a style={{ maxWidth: 880, margin: "0 auto" }}>
          {CURRICULUM.map((w, i) => (
            <div key={i} className="wk" style={{ borderLeft: `4px solid ${w.color}` }}>
              <div className="wk-h" onClick={() => setOw((p) => ({ ...p, [i]: !p[i] }))}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${w.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: w.color }}>
                    {w.week}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--tx)" }}>Week {w.week}: {w.theme}</div>
                    <div style={{ fontSize: 12, color: "var(--tx4)", marginTop: 1 }}>{w.sessions.length} sessions{w.assignment ? " + assignment" : ""}</div>
                  </div>
                </div>
                {ow[i] ? <ChevronDown size={18} color="#94A3B8" /> : <ChevronRight size={18} color="#94A3B8" />}
              </div>
              {ow[i] && (
                <div style={{ padding: "0 24px 24px" }}>
                  {w.sessions.map((s) => (
                    <div key={s.n} className="ss">
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span style={{ width: 28, height: 28, borderRadius: 8, background: `${w.color}12`, color: w.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{s.n}</span>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--tx)" }}>{s.title}</h4>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                        {s.topics.map((t, j) => (
                          <div key={j} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--tx2)", alignItems: "center" }}>
                            <CheckCircle2 size={13} color="#059669" style={{ flexShrink: 0 }} /> {t}
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--tx4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Build with</div>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {s.tech.map((t, j) => (
                          <span key={j} className="tech" style={{ background: `${w.color}08`, color: w.color, border: `1px solid ${w.color}22` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {w.assignment && (
                    <div className="asgn" style={{ background: "#ECFDF5", border: "1.5px solid #A7F3D0" }}>
                      <FileText size={18} color="#059669" style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#059669", marginBottom: 6 }}>{w.assignment.title}</div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {w.assignment.tech.map((t, j) => <span key={j} className="tech" style={{ background: "var(--bgc)", color: "#059669", border: "1px solid #A7F3D0" }}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="cap">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--bgc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Presentation size={24} color="#7C3AED" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: "var(--tx)" }}>Capstone: Live Presentation</h3>
                <span style={{ fontSize: 12, color: "#7C3AED", fontWeight: 600 }}>2 weeks post-course</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "var(--tx2)", lineHeight: 1.65, marginBottom: 16 }}>
              Build an enterprise AI platform and <strong style={{ color: "var(--tx)" }}>present it LIVE in front of a panel audience</strong>.
              Your presentation is <strong style={{ color: "var(--tx)" }}>recorded and evaluated</strong> on architecture, code quality, and communication.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Multi-agent Orchestration", "LangGraph Persistence", "RAG + Hybrid Retrieval", "MCP Integration", "Deep Agent Harness", "LangSmith Tracing", "Production Deploy", "Live Demo & Q&A"].map((t, i) => (
                <span key={i} className="tech" style={{ background: "var(--bgc)", color: "#7C3AED", border: "1px solid #C4B5FD", fontSize: 12, padding: "5px 14px" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackingSection() {
  const r = useAnim();
  return (
    <section className="sec sec-gray" id="tracking" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ color: "#EF4444" }}>Transparent Progress Tracking</p>
          <h2 className="h2">We Track Every Student. <span className="grad">Personally.</span></h2>
          <p className="sub" style={{ margin: "0 auto" }}>This isn't a course where you disappear after enrolling. Your performance is scored across 4 dimensions, ranked weekly, and shared with the cohort.</p>
        </div>

        {/* 4 Tracking Parameters */}
        <div className="g4" data-a style={{ marginBottom: 40 }}>
          {TRACKING.map((c, i) => (
            <div key={i} className="card" style={{ textAlign: "center", borderTop: `4px solid ${c.color}` }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <c.icon size={24} color={c.color} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--tx)", marginBottom: 6 }}>{c.name}</div>
              <div style={{ fontSize: 14, color: "var(--tx3)", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* How scoring works */}
        <div data-a className="card" style={{ textAlign: "center", padding: 32, marginBottom: 40, borderTop: "4px solid #2563EB" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--tx)", marginBottom: 12 }}>How Your Score is Calculated</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", fontSize: 15, fontWeight: 700 }}>
            <span style={{ color: "#2563EB" }}>Attendance</span>
            <span style={{ color: "var(--tx4)" }}>+</span>
            <span style={{ color: "#059669" }}>Submission</span>
            <span style={{ color: "var(--tx4)" }}>+</span>
            <span style={{ color: "#D97706" }}>Quality</span>
            <span style={{ color: "var(--tx4)" }}>+</span>
            <span style={{ color: "#EF4444" }}>Engagement</span>
            <span style={{ color: "var(--tx4)" }}>=</span>
            <span style={{ color: "var(--tx)", fontSize: 18 }}>Overall Score & Rank</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--tx3)", marginTop: 10 }}>Rankings updated weekly. Shared transparently with the entire cohort.</p>
        </div>

        {/* Leaderboard */}
        <div data-a>
          <p style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: "var(--tx2)", marginBottom: 20 }}>Sample Leaderboard - Previous Cohort</p>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead>
                <tr><th>Rank</th><th>Student</th><th>Attendance</th><th>Submission</th><th>Quality</th><th>Engagement</th><th>Overall</th></tr>
              </thead>
              <tbody>
                {CANDIDATES.map((c) => {
                  const colors = [
                    { bg: "#FEF3C7", fg: "#B45309" },
                    { bg: "#E2E8F0", fg: "#475569" },
                    { bg: "#FED7AA", fg: "#C2410C" },
                  ];
                  const rc = c.rank <= 3 ? colors[c.rank - 1] : { bg: "var(--bg3)", fg: "var(--tx4)" };
                  return (
                    <tr key={c.rank}>
                      <td><span className="rk" style={{ background: rc.bg, color: rc.fg }}>{c.rank}</span></td>
                      <td style={{ fontWeight: 600, color: "var(--tx)" }}>{c.name}</td>
                      <td style={{ color: "var(--tx2)" }}>{c.att}</td>
                      <td style={{ color: "var(--tx2)" }}>{c.sub}</td>
                      <td style={{ color: "var(--tx2)" }}>{c.qual}</td>
                      <td style={{ color: "var(--tx2)" }}>{c.eng}</td>
                      <td><strong style={{ color: c.rank <= 3 ? "#059669" : "var(--tx)", fontSize: 15 }}>{c.overall}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--tx4)" }}>
            <Trophy size={14} color="#D97706" style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            Top performers get featured, referral bonuses, and priority access to advanced cohorts.
          </p>
        </div>

        {/* Individual Evaluation Report */}
        <div data-a style={{ marginTop: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p className="label" style={{ color: "#7C3AED" }}>Individual Evaluation Reports</p>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--tx)", marginBottom: 8 }}>Every Assignment Gets a Detailed Quality Report</h3>
            <p style={{ fontSize: 15, color: "var(--tx3)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              We don't just grade your work. You get a multi-page evaluation covering architecture, code quality, what worked, what could be better, and a bottom-line summary.
            </p>
          </div>

          {/* Score summary cards */}
          <div className="card" style={{ padding: 0, borderTop: "4px solid #7C3AED", overflow: "hidden" }}>
            <div style={{ padding: "28px 32px", textAlign: "center", borderBottom: "1.5px solid var(--bd)" }}>
              <p style={{ fontSize: 13, color: "var(--tx4)", fontWeight: 600, marginBottom: 4 }}>SAMPLE REPORT - Previous Cohort Student</p>
              <h4 style={{ fontSize: 20, fontWeight: 900, color: "var(--tx)" }}>RAG Architect - Week 1 Evaluation</h4>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1.5px solid var(--bd)" }}>
              {[
                { label: "Architecture", score: "88", max: "100", color: "#2563EB" },
                { label: "Code Quality", score: "98", max: "100", color: "#059669" },
                { label: "Code Sanity", score: "24", max: "25", color: "#7C3AED" },
                { label: "Grand Total", score: "186", max: "200", color: "#D97706", grade: "A" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "24px 16px", textAlign: "center", borderRight: i < 3 ? "1.5px solid var(--bd)" : "none" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.score}</div>
                  <div style={{ fontSize: 12, color: "var(--tx4)", marginTop: 2 }}>/ {item.max}{item.grade ? ` (${item.grade})` : ""}</div>
                  <div style={{ fontSize: 13, color: "var(--tx2)", fontWeight: 600, marginTop: 6 }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Detailed scoring table */}
            <div style={{ padding: "24px 32px" }}>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 16 }}>Part A: Architecture (88/100)</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--bd)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", color: "var(--tx2)", fontWeight: 700 }}>Criteria</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "var(--tx2)", fontWeight: 700, width: 60 }}>Max</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "var(--tx2)", fontWeight: 700, width: 60 }}>Score</th>
                    <th style={{ textAlign: "left", padding: "8px 0 8px 12px", color: "var(--tx2)", fontWeight: 700 }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: "Architecture Diagram", m: 20, s: 19, r: "Two Mermaid diagrams. Layered: Client, Ingestion, Governance, Embedding, Query Pipeline." },
                    { c: "RAG Flow Explanation", m: 20, s: 17, r: "README covers features and flow. Could go deeper on data flow steps." },
                    { c: "Retrieval + Embedding", m: 20, s: 17, r: "FAISS + OpenAI embeddings. Explained in diagram and features." },
                    { c: "Reranker + Generation", m: 20, s: 17, r: "LLM reranker + grounded generation with citations. Diagrammed." },
                    { c: "Bonus (Advanced Design)", m: 20, s: 18, r: "Multi-tenancy, versioning, governance, SHA256 dedup, latency tracking." },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--bd2)" }}>
                      <td style={{ padding: "10px 0", color: "var(--tx)", fontWeight: 500 }}>{row.c}</td>
                      <td style={{ textAlign: "center", padding: "10px 12px", color: "var(--tx3)" }}>{row.m}</td>
                      <td style={{ textAlign: "center", padding: "10px 12px", color: "#059669", fontWeight: 700 }}>{row.s}</td>
                      <td style={{ padding: "10px 0 10px 12px", color: "var(--tx3)", fontSize: 12 }}>{row.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 16 }}>Part B: Code (98/100)</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--bd)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", color: "var(--tx2)", fontWeight: 700 }}>Criteria</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "var(--tx2)", fontWeight: 700, width: 60 }}>Max</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "var(--tx2)", fontWeight: 700, width: 60 }}>Score</th>
                    <th style={{ textAlign: "left", padding: "8px 0 8px 12px", color: "var(--tx2)", fontWeight: 700 }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: "Ingestion & Chunking", m: 15, s: 15, r: "Full pipeline: PDF extract, page tracking, SHA256, versioned records." },
                    { c: "Embedding & Vector Storage", m: 15, s: 15, r: "FAISS + OpenAI embeddings. Manifest governance. Dedup. Version lifecycle." },
                    { c: "Retrieval (Top-K)", m: 15, s: 14, r: "FAISS similarity search. Tenant-aware. Returns full metadata." },
                    { c: "Reranking", m: 15, s: 14, r: "LLM-based reranker with fallback. Original implementation." },
                    { c: "Answer Generation", m: 15, s: 14, r: "Original prompt. Inline citations. Enterprise-style system prompt." },
                    { c: "Code Sanity & AI Detection", m: 25, s: 24, r: "Full CLI, FastAPI, Streamlit UI, test script, screenshots. Excellent." },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--bd2)" }}>
                      <td style={{ padding: "10px 0", color: "var(--tx)", fontWeight: 500 }}>{row.c}</td>
                      <td style={{ textAlign: "center", padding: "10px 12px", color: "var(--tx3)" }}>{row.m}</td>
                      <td style={{ textAlign: "center", padding: "10px 12px", color: "#059669", fontWeight: 700 }}>{row.s}</td>
                      <td style={{ padding: "10px 0 10px 12px", color: "var(--tx3)", fontSize: 12 }}>{row.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Detailed Feedback */}
              <div style={{ borderTop: "2px solid var(--bd)", paddingTop: 24 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--tx)", marginBottom: 16 }}>Detailed Feedback</h4>

                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ fontSize: 14, fontWeight: 700, color: "var(--tx)", marginBottom: 8 }}>Architecture (88/100)</h5>
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 4 }}>What worked:</p>
                    <ul style={{ fontSize: 13, color: "var(--tx2)", paddingLeft: 20, lineHeight: 1.7 }}>
                      <li>Two Mermaid diagrams: one in a separate .mmd file and one inline in the README. Both are original and map to the actual code.</li>
                      <li>Well structured README covering multi-tenancy, document governance, the RAG pipeline, citations, and latency tracking.</li>
                      <li>Screenshots included showing the system actually running. Architecture diagram correctly shows the conditional path.</li>
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#D97706", marginBottom: 4 }}>What could be better:</p>
                    <ul style={{ fontSize: 13, color: "var(--tx2)", paddingLeft: 20, lineHeight: 1.7 }}>
                      <li>README could have a dedicated section explaining the data flow step by step. The feature list is good but a walkthrough would help.</li>
                      <li>No discussion of why FAISS was chosen over Pinecone/Milvus, or why text-embedding-3-small was chosen. A few sentences on tradeoffs would show more depth.</li>
                    </ul>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ fontSize: 14, fontWeight: 700, color: "var(--tx)", marginBottom: 8 }}>Code (98/100)</h5>
                  <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 16, marginBottom: 10 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>Comparison with reference code:</p>
                    <p style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.7 }}>
                      Zero overlap with the instructor reference code. Completely different stack: FAISS instead of Pinecone, OpenAI embeddings via LangChain, LLM-based reranker, manifest-based governance. Every file is written from scratch.
                    </p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 4 }}>What worked:</p>
                  <ul style={{ fontSize: 13, color: "var(--tx2)", paddingLeft: 20, lineHeight: 1.7, marginBottom: 10 }}>
                    <li>Clean multi-tenancy with namespace isolation. Real multi-tenancy, not just a config variable.</li>
                    <li>SHA256 file hashing, page-by-page text extraction, versioned record building. Clean and modular.</li>
                    <li>Manifest-based governance with document versioning, duplicate detection, and lifecycle management.</li>
                    <li>Complete CLI with three commands, FastAPI with debug mode, and full Streamlit UI with sidebar controls.</li>
                    <li>End-to-end test script with latency measurement at each step.</li>
                  </ul>
                </div>

                {/* Bottom Line */}
                <div style={{ background: "var(--bg2)", borderRadius: 12, padding: 20, borderLeft: "4px solid #059669" }}>
                  <h5 style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 8 }}>Bottom Line</h5>
                  <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.7 }}>
                    This is one of the strongest submissions. A completely original system with a different stack, enterprise features (multi-tenancy, manifest-based governance, version lifecycle, duplicate detection, latency tracking), and three interfaces (CLI, FastAPI, Streamlit). The code is well structured, the architecture is documented with Mermaid diagrams, and includes screenshots and a test script proving it works.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 32px", borderTop: "1.5px solid var(--bd)", textAlign: "center", background: "var(--bg2)" }}>
              <p style={{ fontSize: 12, color: "var(--tx4)", marginBottom: 12 }}>This is a real evaluation report from a previous DataSense cohort. Every student receives this level of detailed feedback.</p>
              <a
                href={process.env.PUBLIC_URL + "/sample-evaluation.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-p btn-s"
              >
                <FileText size={14} /> View Original PDF Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  const r = useAnim();
  return (
    <section className="sec" id="instructor" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="label" style={{ color: "#D97706" }}>Who's Behind This</p>
          <h2 className="h2">Built by <span className="grad">DataSense</span></h2>
        </div>
        <div data-a style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="inst" style={{ flexDirection: "column", textAlign: "center", padding: "40px 36px" }}>
            <div className="av" style={{ margin: "0 auto 20px", width: 100, height: 100, fontSize: 28 }}>DS</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--tx)", marginBottom: 4 }}>DataSense</h3>
            <p style={{ color: "#2563EB", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Top 1% on Topmate</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16, fontSize: 13, color: "var(--tx3)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} color="#D97706" /> 4.8/5 rating</span>
              <span>128+ ratings</span>
              <span>103 testimonials</span>
            </div>
            <p style={{ color: "var(--tx2)", lineHeight: 1.7, fontSize: 15, marginBottom: 20, maxWidth: 560, margin: "0 auto 20px" }}>
              Data Sense is a platform dedicated to helping individuals grow in Data Analytics, Machine Learning, and AI. Through engaging events, challenges, and real-world case studies, we provide practical learning opportunities. Join our community to collaborate, learn, and stay updated with the latest in the data-driven world.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              {["AI & ML", "Data Analytics", "Gen AI Projects", "SQL", "Python", "RAG Systems", "AI Agents"].map((tag, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 6, background: "var(--bg3)", color: "var(--tx2)", border: "1px solid var(--bd)" }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <a href="https://topmate.io/datasense" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", padding: "8px 16px", borderRadius: 8, border: "1px solid #BFDBFE", textDecoration: "none" }}>
                <Globe size={14} /> Topmate Profile
              </a>
              <a href={WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#059669", background: "#ECFDF5", padding: "8px 16px", borderRadius: 8, border: "1px solid #A7F3D0", textDecoration: "none" }}>
                <MessageSquare size={14} /> Join WhatsApp Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const r = useAnim();
  return (
    <section className="sec sec-gray" id="pricing" ref={r}>
      <div className="wrap">
        <div data-a style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="label" style={{ color: "#059669" }}>Pricing</p>
          <h2 className="h2">Invest in Your AI Career</h2>
        </div>
        <div className="price" data-a>
          <div style={{ fontSize: 52, fontWeight: 900, color: "var(--tx)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            $100
          </div>
          <p style={{ color: "var(--tx4)", fontSize: 14, marginBottom: 16 }}>One-time payment &middot; Full access &middot; Lifetime recordings</p>
          <div style={{ background: "#ECFDF5", border: "1.5px solid #A7F3D0", borderRadius: 12, padding: "16px 20px", marginBottom: 28 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#059669", marginBottom: 6 }}>45% OFF - Early Bird Offer</p>
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.6 }}>
              Use coupon code <span style={{ background: "#0F172A", color: "#fff", padding: "4px 12px", borderRadius: 6, fontWeight: 800, fontSize: 14, fontFamily: "monospace", letterSpacing: 1.5 }}>AGENTICAI</span> at checkout for <strong style={{ color: "#059669", fontSize: 16 }}>45% off</strong>
            </p>
          </div>
          <div className="inc">
            {INCLUDED.map((x, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--tx2)" }}>
                <x.i size={15} color="#059669" style={{ flexShrink: 0 }} /> {x.t}
              </div>
            ))}
          </div>
          <a href={ENROLL_URL} className="btn btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "15px 28px" }}>
            Enroll Now <ExternalLink size={16} />
          </a>
          <p style={{ fontSize: 12, color: "var(--tx4)", marginTop: 16 }}>7-day refund policy &middot; One-time payment</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [o, setO] = useState({});
  const r = useAnim();
  return (
    <section className="sec" id="faq" ref={r}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div data-a style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="label" style={{ color: "#D97706" }}>FAQ</p>
          <h2 className="h2">Common Questions</h2>
        </div>
        <div data-a>
          {FAQS.map((f, i) => (
            <div key={i} className="fq">
              <div className="fq-q" onClick={() => setO((p) => ({ ...p, [i]: !p[i] }))}>
                <span>{f.q}</span>
                {o[i] ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
              </div>
              {o[i] && <div className="fq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Brain size={18} color="#2563EB" />
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--tx)" }}>DataSense - Agent Builder</span>
        </div>
        <span style={{ fontSize: 12, color: "var(--tx4)" }}>&copy; {new Date().getFullYear()} DataSense. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#">Privacy</a><a href="#">Terms</a><a href={ENROLL_URL}>Enroll</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <style>{css}</style>
      <TopBar />
      <Nav dark={dark} toggleDark={toggleDark} />
      <Hero />
      <NumbersBar />
      <AboutCourse />
      <Frameworks />
      <JourneySection />
      <CurriculumSection />
      <SyllabusTable />
      <TrackingSection />
      <InstructorSection />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
