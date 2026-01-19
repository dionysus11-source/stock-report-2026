# Change: Refine WebApp UI Layout

## Why
User feedback indicates that the fundamental metric grid (PER, PBR, ROE, Market Cap) is redundant or takes up too much space. Additionally, the news section is too cluttered with metadata (date/source) and the sentiment tags could be more expressive (emojis).

## What Changes
- **Remove Fundamental Grid**: Delete the section displaying PER, PBR, ROE, and Market Cap.
- **Simplify News Items**:
  - Remove date and source labels.
  - Use emojis for sentiment tags (e.g., 😊 for Positive, 😐 for Neutral, ☹️ for Negative).
- **Premium Aesthetic Overhaul**:
  - Update typography (Inter/Outfit).
  - Redesign the global layout for a more "premium" and "modern" feel (Toss-inspired).
  - Add enhanced motion and transitions.

## Impact
- **Specs**: `stock-report-viewer`
- **Code**: `webapp/frontend/src/App.jsx`
