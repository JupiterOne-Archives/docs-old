# Compliance Mapping - Evidence

Each compliance requirement or control can have the following items as evidence:

- Mapped query questions
- Linked external evidence
- Additional notes

## Query Questions

From the compliance requirement details view, you can add a new question or map
an existing question to the selected requirement.

As long as data is represented within JupiterOne -- entities and relationships
that comes from either managed integrations or custom automation, writing
queries to provide data-drive compliance evidence is the recommended approach.

Each "question" can have one or more queries. The queries can be named to
trigger automated compliance gap analysis. See [this article][1] for more
details.

## External Evidence

In some cases, compliance evidence cannot be provided via data available in
JupiterOne. Evidence documents collected and hosted outside of JupiterOne (e.g.
on SharePoint or Google Docs) may be provided as an external linked to a given
compliance requirement.

Each linked evidence can have a `name`, `description`, in addition to the
`webLink` URL.

_The ability to upload external evidence directly will be added soon._

## Notes

Additionally, free form notes can be added to any compliance requirement or
control item to provide more details or context as needed. Each note, when
saved, will capture the author and timestamp.

[1]: ../compliance/compliance-gap-analysis.md
