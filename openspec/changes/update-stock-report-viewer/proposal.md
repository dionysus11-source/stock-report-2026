# Change: Update Stock Report Viewer & Refine News Sentiment

## Why
Users reported issues with the frontend (image loading 404s) and requested several enhancements to improve the usability and depth of the stock reports. Specifically:
- Charts are not loading due to incorrect paths.
- Stock titles lack links to trading platforms (Toss).
- Fundamental analysis details (pass/fail status) are not clearly visible.
- News sentiment is missing or not displayed.

## What Changes
- **Frontend Fixes**: Resolve 404 errors for chart images.
- **UI Enhancements**: 
  - Change title format to "Name (Code)" and add a hyperlink to Toss Invest.
  - Display detailed pass/fail status for Fundamental Analysis items and a summary count.
  - Display News with explicit sentiment tags (Positive/Neutral/Negative).
- **Backend Refinements**: 
  - Enforce strict sentiment analysis output in `stock-news` skill.

## Impact
- **Specs**: `stock-report-viewer`, `stock-news`
- **Code**: `webapp/frontend`, `skills/stock-news`
