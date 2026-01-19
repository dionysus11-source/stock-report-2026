# Change: Update WebApp Card Layout

## Why
The current report detail view presents information in a long linear list, which can make it difficult for users to quickly find specific types of analysis. By organizing details into distinct, category-based cards—mapped directly to the analysis report types (Fundamental, Technical, News)—the interface becomes more modular, intuitive, and easier to scan.

## What Changes
- **Module-Based Layout**: Group information into three primary cards:
  - **Fundamental Health Card**: Contains checklist details and financial health summary.
  - **Technical Setup Card**: Contains MA20 status, Golden Cross, and candle indicators.
  - **News Pulse Card**: Contains recent news items with sentiment analysis.
- **Section Headers**: Use more prominent, distinct headers for each module to improve visual hierarchy.
- **Improved Spacing**: Ensure consistent margins and padding between these category cards to reduce visual clutter.

## Impact
- **Affected specs**: `stock-report-viewer`
- **Affected code**: `webapp/frontend/src/App.jsx`
