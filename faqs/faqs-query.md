# Query related FAQs

## How do I search/filter on all entities from an integration without enumerating all types?

For example, you may want to identify if a certain tag is present across all
entities from AWS. You can do this by using the special metadata
`_integrationType`, like this:

```j1ql
Find * with _integrationType="aws" and tag.ABC=undefined
```

You may also want to limit this query to filter out irrelevant entities by class.
For example:

```j1ql
Find * with
  _integrationName="aws" and
  tag.ABC=undefined and
  _class!='Finding'
```

If you have multiple integrations and would like to limited your search to one
particular account, use `tag.AccountName` in your query filter.
