## ADDED Requirements

### Requirement: Remote Report Upload API
시스템은 원격지에서 생성된 분석 리포트를 중앙 서버로 전송할 수 있는 API 엔드포인트를 제공해야 한다 (SHALL).

#### Scenario: Successfully upload a report
- **WHEN** 유효한 `report.json` 파일 데이터가 POST 요청으로 `/api/upload-report`에 전달되면
- **THEN** 시스템은 해당 리포트의 날짜를 확인하여 `report/YYYY-MM-DD/` 디렉토리에 파일을 저장한다 (SHALL).
- **AND** 저장 완료 후 HTTP 201 Created 응답을 반환한다.

#### Scenario: Upload report with images
- **WHEN** `report.json`과 함께 관련 이미지(차트 등)가 멀티파트 요청으로 전달되면
- **THEN** 시스템은 이미지를 동일한 날짜 디렉토리에 저장하고, JSON 내의 이미지 경로가 올바르게 참조되도록 한다 (SHALL).
