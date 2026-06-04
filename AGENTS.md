# AGENTS.md - Tienda Nova

## Project context

This is a React + Vite + TypeScript project for Tienda Nova, a fashion ecommerce website with a streetwear/premium visual direction.

The project already exists. Do not rebuild it from scratch.

## Design skill context

Use the local Impeccable skill as design guidance when improving UI:

- `.agents/skills/impeccable/SKILL.md`
- `.agents/skills/impeccable/reference/audit.md`
- `.agents/skills/impeccable/reference/colorize.md`
- `.agents/skills/impeccable/reference/layout.md`
- `.agents/skills/impeccable/reference/polish.md`
- `.agents/skills/impeccable/reference/typeset.md`
- `.agents/skills/impeccable/reference/codex.md`

Use those files as design references, not as files to modify.

## Main goal

Improve only the visual design of Tienda Nova.

The desired direction is:

- premium streetwear ecommerce
- modern
- clean
- readable
- elegant
- responsive
- strong contrast
- no generic AI-looking design

## Hard restrictions

Do not change:

- React business logic
- services
- hooks
- routes
- chatbot behavior
- cart behavior
- product filtering logic
- data models
- environment variables

Do not delete features.

Do not modify `.env`.

Do not touch generated folders like `dist` or `node_modules`.

## Files to focus on

Prioritize:

- `src/index.css`
- `src/App.tsx`
- `src/components/layout`
- `src/components/home`
- `src/components/product`
- `src/components/cart`
- `src/components/chat`

## Visual problems to prioritize

Fix:

- low contrast text
- invisible buttons
- light text on light backgrounds
- dark text on dark backgrounds
- inconsistent dark mode
- weak hover/focus states
- poor spacing
- cards without enough separation
- generic-looking sections

## Workflow

Before modifying files:

1. Audit the current visual design.
2. Identify contrast and readability problems.
3. List the components that need visual improvements.
4. Propose a phased plan.
5. Explain what files will not be touched.

Only after approval, apply changes in phases.

## Coding style

Keep changes minimal and focused.

Prefer improving existing components instead of creating unnecessary new abstractions.

Use TypeScript and React conventions already present in the project.

Do not add new dependencies unless explicitly approved.