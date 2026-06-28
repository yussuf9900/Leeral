---
name: "ui_ux_pro_max"
description: "Guidelines and instructions to make the UI and UX highly professional, premium, and stunning."
---

# UI/UX Pro Max Skill Guidelines

This skill defines the visual rules and micro-interaction behaviors required to deliver an elite web experience.

## Rules
- **Color Depth**: Use dark background gradients (`#090d1f` and `#030712`) to emphasize light elements. Avoid solid flat blacks or standard blues.
- **Glassmorphism**: Use backdrops with thin borders and slight blur where appropriate (e.g. modals, overlays):
  `background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.06);`
- **Soft Shadows & Glows**: Shadows in dark mode should use soft colored glows aligned with brand accents:
  `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 16px rgba(255, 208, 0, 0.1);`
- **Transitions**: Smoothly animate state changes with a spring or cubic-bezier curve (e.g. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Typography Contrasts**: Clearly separate hierarchy through weight and letter-spacing for uppercase metadata.
