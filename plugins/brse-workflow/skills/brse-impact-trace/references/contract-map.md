# Contract Map

Use this map to avoid shallow impact analysis:

## Frontend

- Route registration and guards.
- Menu visibility and permission gates.
- API client method and request payload.
- Feature flags, environment config, tenant/client settings.
- Error, empty, loading, disabled, timeout, and retry states.

## Backend

- Route/controller/action.
- Request validation and default values.
- Service/domain branching.
- Permission/session/auth checks.
- Model relation and persistence side effects.
- Response shape and status codes.

## Database

- Migration history.
- Model definitions.
- Seed/init data.
- Existing rows or client-specific config that gate behavior.

## Batch / Async

- Command arguments.
- Scheduler/queue trigger.
- External storage, file, or API side effects.
- Logs and failure behavior.

## Reporting

Report as:

- Confirmed behavior.
- Possible impact.
- Not affected and why.
- Unknown until specific source/data is checked.
