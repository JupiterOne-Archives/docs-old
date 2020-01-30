# Export Compliance Artifacts

The ![download][download-icon] "Download" button in JupiterOne Compliance app
provides two options to export compliance artifacts:

- **Summary**
- **All Evidence**

> Compliance artifact export is an asynchronous background job. The download
> icon will turn green when the artifact finishes building in the background.
> You may leave the app while the artifact is being generated. You will receive
> an email notification when the download is available.

## Compliance Summary

The **Summary** artifact is a zip package containing these two files:

- `complete-policies-and-procedures-listing.csv`

  A list of all policies and procedures, and the summary text of each procedure.

- `summary.csv`

  A list of all compliance requirements / controls and the status of each item.

## All Evidence

The **All Evidence** artifact is a zip package containing the summary and the
evidence output, in the following folder structure:

```text
<standard_name>_evidence.zip
  |____<standard_name>_evidence
  | |____<standard_name> Requirements
  | | |____<section_title>
  | | | |____<ref> <title>
  | | | | |____policies-and-procedures.csv
  | | | | |____links.md
  | | | | |____note_0_<timestamp>.md
  | | | | |____note_1_<timestamp>.md
  | | | | |____0_<title_of_first_mapped_question>
  | | | | | |____0_<first_query_in_question>.csv
  | | | | | |____1_<second_query_in_question>.csv
  | | | | |____1_<title_of_second_mapped_question>
  | | | | | |____0_<first_query_in_question>.csv
  | | | | | |____1_<second_query_in_question>.csv
  | | | | |____...
  | | | | | |____...
  | |____complete-policies-and-procedures-listing.csv
  | |____summary.csv
```

> Note: the output of each query is limited to a sample of up to 250 results.

[download-icon]: https://raw.githubusercontent.com/feathericons/feather/master/icons/download.svg?sanitize=true
