# Change: Support Mobile View for Stock Report Viewer

## Why
On mobile devices, the dashboard sidebar (containing analysis dates and stock lists) is hidden by default, and there is no UI element (trigger) to open it. This makes the application unusable on mobile as users cannot navigate between different reports or stocks.

## What Changes
- Add a responsive header to the dashboard layout.
- Include a `SidebarTrigger` in the header, visible on mobile devices, to allow opening the sidebar.
- Display the current selection (Date/Stock) in the mobile header for better context.
- Ensure the desktop site remains unchanged by using responsive Tailwind classes (`md:hidden`, etc.).

## Impact
- Affected specs: `specs/stock-report-viewer/spec.md`
- Affected code: 
    - `webapp/frontend/src/app/reports/layout.js` (Add header with trigger)
    - `webapp/frontend/src/components/app-sidebar.jsx` (Optional: minor tweaks for mobile if needed)
