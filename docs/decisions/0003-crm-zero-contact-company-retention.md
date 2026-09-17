# Delete CRM companies with no contacts

Date: 2026-09-17

The workspace owner requested that companies with zero contacts be removed
from the CRM, including companies left behind after bounced contacts are deleted.

Deleting the last contact or moving it to a different company now checks the
old company and invokes its existing deletion cascade in the same transaction.
An internal five-minute sweep covers existing empty companies and independent
company creation/import paths. Contact existence uses the `by_company` index;
contacts without email still count. No status or enrichment exemption applies.

The sweep reads 100 companies per page, uses a fixed start time as its upper
creation boundary, and schedules continuation pages. Each deletion gets its
own mutation, rechecks contact existence, and logs success atomically with the
deletion. Missing companies are safe to replay. Individual failures are logged
without preventing other candidates from being processed; the next sweep
retries them. Contact create/update validates the destination company so
cleanup cannot race with those paths to create a dangling company reference.

The existing company cascade removes related operational CRM rows and updates
deal aggregates. Historical outreach delivery and website assessment records
retain their existing retention behavior. Companies created without a contact
can be removed on the next sweep, so the Companies page and README explain the
policy. This changes workspace retention, not the tools available to AI agents.
