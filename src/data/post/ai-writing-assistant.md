---
# The in-page hero visual is the demo video embedded at the top of the body
# (public/videos/aitxt-web.mp4). The image below stays as the OG/social-card
# and blog-list thumbnail — a video cannot serve as an OpenGraph image, and
# social platforms require a static image. Optionally swap og-default for a
# purpose-made card still later; keep it a real, existing local asset so the
# build can resolve its dimensions.
publishDate: 2026-07-06T00:00:00Z
title: "How I Built an AI Writing Assistant for Professional Communication"
excerpt: "I built AITxt because Grammarly phoned home and chat-based AI tools were too slow for a two-sentence Slack fix. It runs on Ollama by default — your text never leaves your machine."
image: ~/assets/images/og-default.jpg
author: David Lopez
category: AI Engineering
tags:
  - ai
  - productivity
  - bash
  - cli
  - writing
metadata:
  title: "How I Built an AI Writing Assistant for Professional Writing"
  canonical: "https://dleolopez.dev/blog/ai-writing-assistant"
  description: "Learn how I built AITxt, an AI writing assistant that corrects grammar and sharpens clarity across emails, Slack, and docs — running locally by default, no API key needed."
  openGraph:
    images:
      - url: ~/assets/images/og-default.jpg
        width: 1200
        height: 630
  twitter:
    handle: "@dleolopez"
    site: "@dleolopez"
    cardType: "summary_large_image"
---

## Introduction

"Can you clean this up before I send it?" — I asked myself that dozens of times a week. The answer was always the same: paste into Grammarly, or into a browser AI chat, wait, copy the result, close the tab, paste back. A five-step workflow for what should be a one-liner.

I write constantly. Technical documentation, client emails, GitHub PR descriptions, Slack messages. The volume is not the problem; the overhead is. Every time I needed a quick grammar pass, I was context-switching to a tool that either sent my text to a third-party server or expected me to drive a chat interface. Neither fit how I work: terminal-first, keyboard-driven, with text moving through pipes.

So I built [AITxt](https://github.com/dleo/ai-text-assistant) — a pure-Bash CLI that reads text from stdin and writes corrected text to stdout. No GUI. No subscription. No text leaving your machine by default. The architecture is a Unix filter; the default runtime is Ollama running `qwen2.5:3b` locally.

This post walks through why I built it, the design decisions that made it actually useful, and what I learned about prompt engineering for deterministic text correction.

<figure class="tm-post-video">
  <video controls preload="metadata" playsinline width="900" src="/videos/aitxt-web.mp4">
    Your browser does not support the video tag. AITxt is a command-line tool that corrects grammar and clarity as text flows through a Unix pipe.
  </video>
  <figcaption>AITxt correcting text from the terminal — grammar and clarity fixed in one pass, meaning and tone preserved.</figcaption>
</figure>

## The Problem with Professional Communication

Written communication at work is asymmetric. The cost of a typo in a client email or a sloppy Slack message is social, and it compounds invisibly — you don't get a bug report, you just lose a bit of credibility. Engineers especially tend to under-edit because editing feels like busywork when you're deep in a flow state.

The available solutions fall into two camps:

**Rule-based checkers** (spell-check, Grammarly's core engine) are fast and can work offline, but they catch surface errors and miss anything requiring context. "Its" vs. "it's" they handle; "the server will be up" when you meant "down" they don't.

**LLM-based tools** (ChatGPT, Copilot, Claude.ai) are context-aware but come with friction: open a browser, navigate the chat UI, type a framing prompt, wait, copy, paste. That's a 30–60-second round trip for a 2-second operation. And every one of those tools sends your text to a cloud server.

Neither fits the way engineers actually work. What I wanted was:

```bash
echo "my draft" | fix-grammar
```

Instant. Composable. Context-aware enough to catch structural problems, not just surface typos.

## Why Existing AI Writing Tools Didn't Fit My Workflow

Grammarly requires an account, stores your documents on their servers, and gates useful suggestions behind a paywall. For quick one-shot corrections it's heavy machinery — a desktop app or browser extension that has to initialize, authenticate, and analyze before it shows you anything.

The cloud AI tools are powerful but designed around conversation. Every session starts fresh. You have to frame your request each time. And the output comes wrapped in preamble: "Sure! Here's the corrected version:" — noise in a pipeline.

I also needed something that could run fully offline. I work on client systems with strict data-handling requirements. Piping proprietary content through a third-party cloud service is not always acceptable, and explaining to a client why their internal documentation went through someone else's infrastructure is a conversation nobody wants to have.

What I needed was a tool that was:

1. **A Unix filter** — reads stdin, writes stdout, composes cleanly with `pbcopy`, `xclip`, `fzf`, and the rest of the terminal toolkit
2. **Local by default** — Ollama with a small, fast model on my own hardware; no API key required to get started
3. **Deterministic** — low temperature so corrections are consistent run to run, not creative
4. **Single-purpose** — it corrects text; it does not compose, summarize, or translate

That last point is deliberate, and I will come back to it.

## Designing AITxt

The design constraints came directly from how I actually use text tools:

**Zero configuration to start.** `echo "bad text" | aitxt` should work on any machine with Bash, curl, jq, and Ollama installed. No API key, no sign-up, no config file.

**Composable by default.** The tool must be pipe-friendly. Improved text goes to stdout; diagnostics, verbose output, and diffs go to stderr. This separation is the Unix contract — it means `aitxt | pbcopy` just works, and `cat draft.txt | aitxt > cleaned.txt` is a natural one-liner.

**Pluggable providers.** Not everyone runs Ollama. I wanted to switch to Anthropic, OpenAI, or Gemini for heavier workloads without modifying the core tool. The solution is a provider contract: each provider is a shell script in `providers/` implementing one function (`provider_request`). Adding a new LLM is a 30-line drop-in.

**Override without friction.** A `~/.config/aitxt/config` file and environment variables let you change models or providers per-project without touching the installed tool.

## Key Features

Every capability below is traceable to the codebase:

**Local-first with Ollama.** The default provider is `ollama` running `qwen2.5:3b`. No API key. Your text never leaves your laptop. Switch to a cloud provider any time with `-p anthropic`, `-p openai`, or `-p gemini`.

**Unix pipe interface.** `echo "text" | aitxt`, `aitxt "text"`, or `cat file.txt | aitxt`. Corrected text to stdout; everything else to stderr. The tool is transparent in pipelines — `aitxt "draft" | pbcopy` copies the result with no surrounding noise.

**Colored diff view.** `-d` shows a `diff -u` style comparison of original vs. improved text on stderr before writing the result to stdout. Useful when you want to review exactly what changed before piping the result further.

**Clipboard integration.** `-c` copies the result to the system clipboard via `wl-copy`, `xclip`, or `pbcopy` depending on your platform.

**Provider and model flags.** `-p` selects the provider; `-m` overrides the model for the current call. Switching between a fast local model and a heavyweight cloud model is a flag away.

**Pluggable providers.** Drop `providers/<name>.sh` implementing `provider_request` under `~/.config/aitxt/providers/` to shadow any built-in or add a new one. The tool sources the user file if it exists, then falls back to the built-in. No reinstall required.

## Technical Architecture

The entry point is a single Bash script with no build step and no package manager. Runtime dependencies: `bash`, `curl`, `jq`. That is it.

### Bash as the host language

I chose Bash deliberately. Every developer machine has it. No runtime version management, no `npm install`, no virtual environment. `curl` is the HTTP client; `jq` handles JSON parsing and payload construction. The entire tool is a handful of shell files you can read in an afternoon.

### The Unix filter model

```
stdin  →  [aitxt]  →  stdout   (corrected text — pipe-clean)
                   →  stderr   (diagnostics, diff, verbose output)
```

This separation is what makes the tool composable. Improved text flows through without noise. Typical workflows:

```bash
# Fix a draft and copy to clipboard
echo "I thinked the implementation was correct" | aitxt -c

# Review changes before accepting
echo "The build is ran in CI" | aitxt -d

# Fix a file in-place
cat draft.md | aitxt > cleaned.md

# Chain with other tools
cat notes.txt | aitxt | grep "TODO"
```

### Pluggable provider contract

Each provider implements exactly one function:

```bash
provider_request() {
    local text="$1"
    # Call the LLM API, extract corrected text, echo it
    echo "$result"
}
```

The main script sources `providers/${AITXT_PROVIDER}.sh` at runtime. Built-in providers cover Anthropic (native Messages API), OpenAI, Gemini (OpenAI-compatible endpoint), and Ollama. A file at `~/.config/aitxt/providers/<name>.sh` shadows the built-in without touching the installation.

This is an intentionally minimal contract. The function takes raw text and returns corrected text. No streaming, no multi-turn context, no side effects. One input, one output, one concern.

### Configuration resolution order

```
Defaults (lib/config.sh)
  ↓
~/.config/aitxt/config  (only AITXT_* keys sourced — safety filter)
  ↓
Environment variables   (AITXT_PROVIDER, AITXT_MODEL, etc.)
  ↓
CLI flags               (-p, -m, ...)
```

Only `AITXT_*`-prefixed keys are read from the config file. This prevents accidentally sourcing arbitrary shell code from a config that a user or script might write.

## Prompt Engineering

The system prompt is the actual product. The model choice matters, but the constraints in the prompt determine whether the output is trustworthy. Here is the verbatim prompt from `lib/config.sh`:

```
You are a text correction assistant. Your ONLY task is to improve the given text.

Rules:
- Help to improve and sounds more natural, but do not change the meaning of the text.
- Fix spelling, grammar, and punctuation errors
- Improve sentence structure and clarity where needed
- Preserve the original meaning, tone, and intent exactly
- Preserve the original language (do not translate)
- Do NOT add explanations, comments, or meta-text
- Do NOT wrap the text in quotes or markdown
- Output ONLY the corrected text, nothing else

If the text is already correct, output it unchanged.
```

Several rules are worth unpacking:

**"Preserve the original meaning, tone, and intent exactly."** This is the most important constraint. An AI writing tool that rewrites your terse Slack message in cheerful corporate prose has made it worse, not better. AITxt is a correction engine, not a voice transformer. Your register comes out the other end. If you write tersely, the output is terse. If you write formally, it stays formal.

**"Preserve the original language (do not translate)."** Write in Spanish, get Spanish back. Write in French, get French back. The model is explicitly instructed not to translate under any circumstances. This is a hard rule in the prompt, not an aspiration — it behaves correctly because the constraint is unambiguous.

**"Do NOT add explanations, comments, or meta-text."** Models default to being helpful in the chatbot sense — they want to explain what they changed and why. In a pipe, that narration is noise that breaks downstream tools. This rule eliminates it. The output is exactly the corrected text.

**"Output ONLY the corrected text, nothing else."** Belt and suspenders alongside the meta-text rule. Combined, they make the output machine-readable and pipe-clean even when the model would otherwise add preamble.

**Temperature 0.2.** The default temperature is `0.2` (set in `lib/config.sh`). Grammar correction is not a creative task — there is a right answer or a small set of equally-correct answers. Low temperature makes the model converge on the most probable correction rather than exploring stylistic alternatives. Higher temperature introduces variance: sometimes it fixes the error, sometimes it makes a different change you didn't ask for. At `0.2`, corrections are consistent and predictable across repeated runs.

This is a deliberate architectural decision, not a default left unchecked. If I were building a brainstorming or ideation tool, I'd push temperature toward `0.7–0.9`. For correction, lower is better.

## Before and After Examples

All examples below were run live against `qwen2.5:3b` via Ollama using `./aitxt` with default settings. No output was fabricated.

### Example 1 — typos and grammatical agreement

The `-d` flag writes a unified diff to stderr. Here is what it renders (ANSI color codes stripped):

```diff
--- original
+++ improved
@@ -1 +1 @@
-Please improve this sentnce while keep my tone.
+Please improve this sentence while keeping my tone.
```

Two corrections in one pass: "sentnce" → "sentence" (spelling), and "while keep" → "while keeping" (verb agreement). Tone and intent: preserved. The output is not paraphrased — it is corrected.

### Example 2 — article error

|               | Text                  |
| ------------- | --------------------- |
| **Original**  | `This is a exmple.`   |
| **Corrected** | `This is an example.` |

Both the indefinite article ("a" → "an") and the spelling ("exmple" → "example") corrected in a single pass.

### Example 3 — multiple transposition errors

|               | Text                  |
| ------------- | --------------------- |
| **Original**  | `Teh quik brown fox`  |
| **Corrected** | `The quick brown fox` |

Two transposed characters across two words. Note: the output remains a fragment — no period added, because there was none in the original. The system prompt says to preserve intent, and a fragment is intentional here.

### Example 4 — non-English input (Spanish)

This example demonstrates the "preserve original language" rule in practice.

|               | Text                                                     |
| ------------- | -------------------------------------------------------- |
| **Original**  | `Esto es un ejmplo de texto con errores de ortografia.`  |
| **Corrected** | `Esto es un ejemplo de texto con errores de ortografía.` |

Two corrections: "ejmplo" → "ejemplo" (spelling), "ortografia" → "ortografía" (missing accent). The language is Spanish; the output is Spanish. The model does not translate the input into English — the prompt rule holds.

## Performance and Productivity Gains

I have been running AITxt in my daily workflow for several months. The gains are qualitative, not metric-driven, but they are real:

**Reduced context-switching.** Fixing a draft no longer means opening a browser. It is a command. The mental cost of breaking flow is close to zero.

**Pipeline composability.** Shell aliases like `alias fix='aitxt -c'` correct and copy in one step. The `-d` flag is useful before committing: see exactly what changed, accept or reject, move on.

**Trustworthy handling of sensitive text.** With Ollama running locally, I pipe client-facing content, internal documentation, and anything else through the tool without thinking twice. The text does not leave the machine.

**Consistent output.** Temperature `0.2` means repeated runs on the same input produce the same result. That predictability is important once you start integrating the tool into scripts or pre-commit hooks.

The honest trade-off: `qwen2.5:3b` is a 3-billion-parameter model. It handles sentence-level corrections reliably; it occasionally misses subtle structural issues that a larger model would catch. Switching to `-p anthropic` or `-p openai` for heavier-weight work is a flag away.

## Lessons Learned

**Prompt constraints are the product.** The model is a commodity; the system prompt is the differentiator. Writing tight negative constraints ("do NOT", "ONLY") is more reliable than writing positive descriptions of desired behavior. LLMs follow explicit prohibitions more consistently than they follow aspirational instructions. "Do not translate" is stronger than "output in the same language as the input."

**Temperature is a design decision, not a default.** Most people run with whatever the framework gives them. For correction tasks, `0.2` is a deliberate choice: it trades creativity for consistency. Document it, reason about it, test it against real inputs.

**Unix primitives age well.** Bash + curl + jq is not the exciting stack in 2026. But every developer machine has all three. The tool installs without a package manager, runs without a version manager, and requires no build step. For a productivity utility that needs to be reliable across machines and environments, that portability is worth more than it sounds.

**The provider contract is the right abstraction level.** One function, one input, one output. Simple enough that writing a new provider takes an hour. Rigid enough that every provider behaves identically from the caller's perspective. I have seen over-engineered plugin systems with factory classes, event hooks, and plugin registries — for this problem, a one-function shell contract is exactly the right level of complexity.

**Single-purpose tools compose better.** AITxt does one thing. It does not summarize, translate, rewrite from scratch, or manage drafts. Because it does exactly one thing, it fits cleanly into pipelines with tools that do everything else. The Unix philosophy survives the LLM era.

If you are curious how I handle multi-step LLM pipelines in production — where you need evals, cost control, and fallbacks — I wrote about that in [Shipping Real-World IA: How I Build Maintainable LLM Systems](/blog/shipping-real-world-ia-how-i-build-maintainable-llm-systems).

<!-- TODO: Add internal link to "Building AI Internal Tools" post once it exists on the site -->
<!-- TODO: Add internal link to "My AI Development Stack" post once it exists on the site -->

## Frequently Asked Questions

### What is an AI writing assistant?

An AI writing assistant is a tool that uses a language model to improve the grammar, clarity, and readability of written text while preserving the original meaning. The best ones improve correctness without making the output sound like a different person wrote it — they fix errors, not voice.

### Can AI improve Slack messages?

Yes. The workflow is simple: paste-fix-send. Run your draft through `aitxt`, review the result with `-d` if you want to see what changed, and post. The tool corrects grammar and sharpens sentence clarity without changing what you are actually saying or the tone you are saying it in. No Slack integration required — it is a clipboard operation.

### Is an AI writing assistant better than Grammarly?

It depends on what you need. Grammarly is strong on rule-based grammar checking and has a polished UI. LLM-based tools go further on sentence-level restructuring and handle contextual issues that rule-based systems miss. LLM writing assistants in general can also adjust tone, summarize, or translate text — though AITxt specifically focuses on correction that preserves your original voice, runs locally, and stays composable in the terminal. If you want Grammarly's UI experience, use Grammarly. If you want a pipe-friendly, local-first correction tool that treats your text as private, AITxt is built for that.

### Can AI rewrite technical documentation?

Yes. Pass a documentation section through `aitxt` and it will improve readability while preserving technical terminology and sentence structure. It will not invent new content, remove correct terms, or change the meaning — the system prompt explicitly forbids all of those. For large documents: `cat docs/api.md | aitxt > docs/api-clean.md`.

## Need a Custom AI Tool for Your Team?

AITxt started as a personal productivity tool — a scratch-my-own-itch afternoon project. But the underlying pattern comes up constantly in client work: teams have a manual workflow that burns engineering time, and the right AI tool would eliminate it. The gap is usually not model capability; it is the engineering work to go from "wouldn't it be nice if…" to something that runs reliably in a real pipeline.

I design and build custom AI solutions for engineering teams: internal assistants, workflow automation, AI-powered product features. If your team is spending hours on something that a well-scoped AI tool could handle — text processing, document review, data extraction, internal Q&A — let's talk about it.

[Let's discuss your use case →](/contact)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an AI writing assistant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI writing assistant is a tool that uses a language model to improve the grammar, clarity, and readability of written text while preserving the original meaning. The best ones improve correctness without making the output sound like a different person wrote it."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI improve Slack messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The workflow is paste-fix-send: run your draft through aitxt, review the result with -d if you want to see what changed, and post. The tool corrects grammar and sharpens sentence clarity without changing what you are saying or the tone you are saying it in."
      }
    },
    {
      "@type": "Question",
      "name": "Is an AI writing assistant better than Grammarly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on what you need. Grammarly is strong on rule-based grammar checking. LLM-based tools go further on sentence-level restructuring and handle context that rule-based systems miss. LLM writing assistants in general can also adjust tone, summarize, or translate — though AITxt specifically focuses on correction that preserves your original voice, runs locally, and stays composable in the terminal."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI rewrite technical documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Pass a documentation section through aitxt and it will improve readability while preserving technical terminology and sentence structure. It will not invent content, remove correct terms, or change the meaning. For large documents: cat docs/api.md | aitxt > docs/api-clean.md."
      }
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://dleolopez.dev/#person",
  "name": "David Lopez",
  "url": "https://dleolopez.dev",
  "sameAs": [
    "https://x.com/dleolopez",
    "https://github.com/dleo",
    "https://linkedin.com/in/dleolopez"
  ]
}
</script>
