# Capability: App Config

This capability defines the global configuration of the application, including networking and infrastructure settings.

## ADDED Requirements

### Requirement: Backend Port Configuration
The backend server SHALL be configured to run on a user-defined port, defaulting to 3001.

#### Scenario: Port 3001 assigned
- **WHEN** the backend starts
- **THEN** it MUST listen on port 3001.

### Requirement: Frontend API Proxy
The frontend SHALL proxy API and image requests to the backend server.

#### Scenario: Proxy to backend
- **WHEN** a request is made to `/api/*` or `/images/*`
- **THEN** it MUST be routed to the backend server at `localhost:3001`.
