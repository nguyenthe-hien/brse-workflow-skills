# Requirement Clarification Checklist

Check these before saying a requirement is dev-ready:

- Trigger: what user action, schedule, API call, or batch starts the behavior.
- Actor: which role, permission, account type, tenant, or client setting is involved.
- Data source: which table, API response, config, file, or external service controls the behavior.
- State: create, update, delete, approve, cancel, timeout, error, resend, retry, or rollback.
- Boundary: target environment, target product surface, excluded legacy behavior, excluded clients.
- Display wording: exact Japanese labels and whether they are customer-facing or internal.
- Acceptance: observable screen/API/database/log result.
- Regression: existing behavior that must not change.
- Question quality: ask about business decisions, not details that can be traced from source.
