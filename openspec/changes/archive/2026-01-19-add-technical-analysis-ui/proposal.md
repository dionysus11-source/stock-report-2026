# Change: Add Technical Analysis UI

## Why
Currently, the detailed report view only shows fundamental analysis and news. Technical analysis data (from `*_technical.json`) exists but is not displayed to the user. This data provides critical insights into price trends, moving averages, and market momentum.

## What Changes
- **Technical Analysis Section**: Add a new section in the report detail view (between Fundamental and News).
- **Data Display**: 
  - **Daily Indicators**: Display MA20 status, Golden Cross status, and Candle color.
  - **Weekly Indicators**: Display MA20 status and MA20 slope.
  - **Current Price**: Display the last tracked price.
- **Visuals**: Use stylized cards and badges consistent with the premium "Toss-style" UI.

## Impact
- **Specs**: `stock-report-viewer`
- **Code**: `webapp/frontend/src/App.jsx`
