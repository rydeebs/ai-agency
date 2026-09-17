# Replace recurring CRM polling with action-triggered work

Date: 2026-09-17

Production logs showed the bounce cron repeatedly searching the same 30 days
of Gmail and invoking one mutation per historical bounce. The mutation also
scanned the entire contacts table. The zero-contact cleanup similarly scanned
every company and performed one contact lookup per company every five minutes.
These idle loops created database I/O without new user work.

The CRM now registers no recurring cron jobs. Campaign sends start when the
owner clicks **Send approved**. Gmail reply and bounce checks run from explicit
buttons. Empty-company sweeps run from the Companies page. Agent work schedules
the exact task once at creation time, including future rechecks at their due
time.

Bounce matching now uses the existing `contacts.by_email` index. A preliminary
indexed query excludes addresses whose contacts were already removed, so a
repeated manual Gmail scan does not invoke duplicate deletion mutations.

Reactive queries still run while the owner has a CRM page open. They are tied
to an active client subscription and are separate from idle background polling.
