---
# The in-page hero visual is the demo video embedded at the top of the body
# (public/videos/aitxt-web.mp4). The image below stays as the OG/social-card
# and blog-list thumbnail - a video cannot serve as an OpenGraph image, and
# social platforms require a static image. Optionally swap og-default for a
# purpose-made card still later; keep it a real, existing local asset so the
# build can resolve its dimensions.
publishDate: 2026-07-06T00:00:00Z
title: "How I Built an AI Writing Assistant for Professional Communication"
excerpt: "I built AITxt because Grammarly phones home and chat-style AI tools are too slow for a quick Slack fix. It runs on Ollama by default, so your text stays on your machine."
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
  description: "Learn how I built AITxt, an AI writing assistant that corrects grammar and sharpens clarity across emails, Slack, and docs. It runs locally by default and needs no API key."
  openGraph:
    images:
      - url: ~/assets/images/og-default.jpg
        width: 1200
        height: 630
  twitter:
    handle: "@dleolopez"
    site: "@dleolopez"
    cardType: "summary_large_image"
hideHeroImage: true
---

<figure class="tm-post-video">
  <video controls preload="metadata" playsinline width="900" src="/videos/aitxt-web.mp4">
    Your browser does not support the video tag. AITxt is a command-line tool that corrects grammar and clarity as text flows through a Unix pipe.
  </video>
  <figcaption>AITxt correcting text from the terminal. Grammar and clarity fixed in one pass, meaning and tone preserved.</figcaption>
</figure>

## Introduction

"Can you clean this up before I send it?" I asked myself that dozens of times a week. The routine was the same: paste into Grammarly or a chat UI, wait, copy the result, close the tab, paste back. Five steps for what should be a one-liner.

I write a lot: docs, client emails, PR descriptions, Slack. The volume is fine. The overhead is not. I wanted something I could run in a terminal without sending text to a third party.

So I built [AITxt](https://github.com/dleo/ai-text-assistant). It is a small Bash CLI that reads from stdin and writes corrected text to stdout. No GUI. No account. Local by default with Ollama running `qwen2.5:3b`.

## What I Needed

- A Unix filter: stdin in, stdout out, clean pipes
- Local by default: no API key needed to start
- Deterministic: low temperature for consistent output
- Single purpose: correct text without changing voice

## How It Works

- Pipe or pass text directly: `echo "text" | aitxt`, `aitxt "text"`, or `cat file.txt | aitxt`
- Corrected text goes to stdout. Diagnostics and optional diff go to stderr
- `-d` shows a unified diff before writing the result
- `-c` copies the result to the clipboard
- `-p` selects provider, `-m` selects model when you need a heavier cloud model

The default provider is Ollama with `qwen2.5:3b`. Switch to Anthropic, OpenAI, or Gemini with a flag when needed.

## Quick Examples

Diff view (-d):

```diff
--- original
+++ improved
@@ -1 +1 @@
-Please improve this sentnce while keep my tone.
+Please improve this sentence while keeping my tone.
```

Simple article fix:

```text
This is a exmple. -> This is an example.
```

Non-English preserved:

```text
Esto es un ejmplo de texto. -> Esto es un ejemplo de texto.
```

## The Prompt That Makes It Work

The system prompt is the product. The model matters, but constraints make the output trustworthy:

```
You are a text correction assistant. Your ONLY task is to improve the given text.

Rules:
- Improve clarity and correctness without changing meaning
- Fix spelling, grammar, and punctuation
- Preserve tone and language
- Do NOT add explanations or meta-text
- Output ONLY the corrected text

If the text is already correct, output it unchanged.
```

Default temperature is 0.2. Correction is not a creative task. Lower temperature keeps results consistent.

## Results In Daily Use

- Near-zero context switching. It is a command, not a web flow
- Fits into scripts and aliases easily
- Safe for sensitive text when running locally
- Predictable output you can trust in pipelines

Trade-off: `qwen2.5:3b` handles sentence-level issues very well. For deeper structural edits, switch providers with a flag.

## FAQ

### What is an AI writing assistant?

It is a tool that uses a language model to improve grammar, clarity, and readability while keeping the original meaning and voice.

### Can it improve Slack messages?

Yes. Paste, run `aitxt`, review with `-d` if you want, then send. No Slack integration needed. It is a fast clipboard flow.

### Is this better than Grammarly?

Different tools for different jobs. Grammarly is strong at rule-based checks and has a polished UI. AITxt focuses on quick, pipe-friendly correction that preserves your voice and can run fully local.

## Need a Custom AI Tool?

AITxt started as a personal productivity tool. The same pattern shows up in client work: a small, focused tool removes a daily paper cut. If your team needs a reliable AI helper for text processing, document review, or internal Q&A, I can help.

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
        "text": "An AI writing assistant uses a language model to improve grammar, clarity, and readability while keeping the original meaning and voice."
      }
    },
    {
      "@type": "Question",
      "name": "Can it improve Slack messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Paste your draft, run aitxt, review with -d if you want to see what changed, and send. It is a fast clipboard flow."
      }
    },
    {
      "@type": "Question",
      "name": "Is this better than Grammarly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They solve different problems. Grammarly excels at rule-based checks and UI. AITxt is a quick, pipe-friendly correction tool that preserves your voice and can run fully local."
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
