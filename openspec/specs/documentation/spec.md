# Capability: Documentation

This capability covers the project's documentation, including setup guides, user manuals, and technical specifications.

## Requirements

### Requirement: Setup Guide
The project SHALL provide a clear and concise setup guide in the `README.md` file.

#### Scenario: Preconditions specified
- **WHEN** a user reads the README
- **THEN** it MUST clearly state that Node.js, Python, and Antigravity are required.

#### Scenario: Installation steps provided
- **WHEN** a user follows the installation guide
- **THEN** they SHOULD be able to install all backend and frontend dependencies using documented commands or scripts.

#### Scenario: Execution steps provided
- **WHEN** a user follows the execution guide
- **THEN** they MUST be able to start the application using `python run_app.py`.

### Requirement: AI Assistant Guidance
The `README.md` SHALL include instructions on how to use the AI assistant for stock analysis.

#### Scenario: Usage example provided
- **WHEN** a user looks for analysis instructions
- **THEN** they SHOULD see an example prompt like "삼성전자 주식 분석해줘".
