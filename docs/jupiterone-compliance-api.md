# Compliance API Endpoints

The following article contains a list of compliance actions from the JupiterOne UI that a user can perform via the graphql API endpoint.

See [JupiterOne Platform API](https://support.jupiterone.io/hc/en-us/articles/360022722094-JupiterOne-Platform-API) 
for an introduction to the JupiterOne API.

**Base URL**: `https://api.us.jupiterone.io`

**Method**: `POST`

**Endpoint for compliance operations**: `/graphql`

**Rate Limits**: Rate limiting is enforced based on your account tier. A `429`
HTTP response code indicates the limit has been reached. The API does not
currently return any rate limit headers.

Whenever you make a `POST` request to the `/graphql` endpoint, the associated J1QL query string is a required parameter.

## List Frameworks

This query retrieves a list of all frameworks (benchmarks, compliance standards, questionnaires) that have been added to your JupiterOne account.

**Variables**

- `cursor`: After running the query, a cursor token is returned. This cursor value can be used in the next request to fetch the next page of results.
- `size`: Optional number to specify the number of frameworks you would like to return

**Query**

```graphql
query ListStandards($size: Int, $cursor: String) {
  complianceStandards(size: $size, cursor: $cursor) {
    complianceStandards {
      id
      name
      standard
      accountId
      createTimestamp
      lastUpdatedTimestamp
      filters {
        key
        values
      }
      specDetails {
        version
        type
        webLink
        auditTracking
        hasDomains
        hasSections
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

## Get Framework

Retrieves a specified framework by id. Includes details such as controls and
assignments.

**Variables**

- `id`: The unique identifier of the framework, returned by the 
`ListStandards` query.

**Query**

```graphql
query ComplianceStandard($id: ID!) {
  complianceStandard(id: $id) {
    id
    name
    standard
    filters {
      key
      values
    }
    specification {
      recurringReviewAssignment {
        reviewFrequency
        currentReviewIsComplete
        ownerAssignments {
          allChildrenAssigned
          ownerHasCompletedCurrentReview
          owner {
            id
            userCreateDate
            type
            mfaSettings
            profile {
              email
              emailVerified
              givenName
              familyName
            }
          }
        }
      }
      standard
      type
      version
      webLink
      sections {
        recurringReviewAssignment {
          reviewFrequency
          currentReviewIsComplete
          ownerAssignments {
            allChildrenAssigned
            ownerHasCompletedCurrentReview
            owner {
              id
              userCreateDate
              type
              mfaSettings
              profile {
                email
                emailVerified
                givenName
                familyName
              }
            }
          }
        }
        title
        description
        requirements {
          ref
          title
          summary
          appliesIf
          applicable
          control
          response
          status
          hasEvidence
          auditStatus
          procedures {
            id
          }
        }
      }
      domains {
        recurringReviewAssignment {
          reviewFrequency
          currentReviewIsComplete
          ownerAssignments {
            allChildrenAssigned
            ownerHasCompletedCurrentReview
            owner {
              id
              userCreateDate
              type
              mfaSettings
              profile {
                email
                emailVerified
                givenName
                familyName
              }
            }
          }
        }
        title
        description
        controls {
          requirement
          ref
          title
          summary
          appliesIf
          applicable
          response
          status
          hasEvidence
          auditStatus
          procedures {
            id
          }
        }
      }
      auditTracking
      unlocked
    }
    specDetails {
      version
      type
      webLink
      auditTracking
      hasDomains
      hasSections
    }
    createTimestamp
    lastUpdatedTimestamp
    rawSpecification
  }
}
```

## Create Framework

To be added.

## Update Framework

This query is used to update an existing framework with one provided as a JSON
schema. Visit the 
[security-policy-templates project](https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards) 
for templated JSON frameworks or use an existing framework you have retrieved
and edited via the API.

**Variables**

- `id`: The unique identifier of the framework, returned by the 
`List frameworks` query.
- `update`: The JSON schema for the framework.

**Query**

```graphql
mutation UpdateStandard($id: ID!, $update: ComplianceStandardUpdateInput!) {
  updateComplianceStandard(id: $id, update: $update) {
    id
    name
    standard
    accountId
    createTimestamp
    lastUpdatedTimestamp
    filters {
      key
      values
    }
    specDetails {
      version
      type
      webLink
      auditTracking
      hasDomains
      hasSections
    }
    specification {
      recurringReviewAssignment {
        reviewFrequency
        currentReviewIsComplete
        ownerAssignments {
          allChildrenAssigned
          ownerHasCompletedCurrentReview
          owner {
            id
            userCreateDate
            type
            mfaSettings
            profile {
              email
              emailVerified
              givenName
              familyName
            }
          }
        }
      }
      standard
      type
      version
      webLink
      sections {
        recurringReviewAssignment {
          reviewFrequency
          currentReviewIsComplete
          ownerAssignments {
            allChildrenAssigned
            ownerHasCompletedCurrentReview
            owner {
              id
              userCreateDate
              type
              mfaSettings
              profile {
                email
                emailVerified
                givenName
                familyName
              }
            }
          }
        }
        title
        description
        requirements {
          ref
          title
          summary
          appliesIf
          applicable
          control
          response
          status
          hasEvidence
          auditStatus
          procedures {
            id
          }
        }
      }
      domains {
        recurringReviewAssignment {
          reviewFrequency
          currentReviewIsComplete
          ownerAssignments {
            allChildrenAssigned
            ownerHasCompletedCurrentReview
            owner {
              id
              userCreateDate
              type
              mfaSettings
              profile {
                email
                emailVerified
                givenName
                familyName
              }
            }
          }
        }
        title
        description
        controls {
          requirement
          ref
          title
          summary
          appliesIf
          applicable
          response
          status
          hasEvidence
          auditStatus
          procedures {
            id
          }
        }
      }
      auditTracking
      unlocked
    }
  }
}
```

## Update Review Configurations

The following queries are used to update the review configuration of a
framework, section, domain, or requirement/control. Each query requires the id
of the framework you are updating as well as an input variable object which
includes a list of owner emails, the review frequency, and the origin of action
links (the domain of your JupiterOne account).

**Variables**

- `complianceStandardId`: The unique identifier for the framework, returned by
  the `List frameworks` query.
- `input`: The input variable is used to capture additional values, including:
  the origin of the action link, the owner(s) of the review configuration, and
  the review frequency. See an example below.

```json
"input": {
  "actionLinkOrigin": "https://j1dev.apps.dev.jupiterone.io",
  "owners": [
    "example@jupiterone.com"
  ],
  "reviewFrequency": "SIXTY_DAYS"
}
```

- `actionLinkOrigin`: Enter the value of your JupiterOne domain
- `owners`: A list of email accounts that have an associated user in JupiterOne.  
- `reviewFrequency`: The frequency that owners will be prompted to review the framework. Valid options include: `WEEKLY`, `MONTHLY`, `SIXTY_DAYS`, `ONE_HUNDRED_EIGHTY_DAYS`, `ANNUALLY`

### Update Review Configurations - Framework

```graphql
mutation ConfigureRecurringComplianceReviewsForStandard($complianceStandardId: ID!, $input: ConfigureRecurringComplianceReviewInput!) {
  configureRecurringComplianceReviewsForStandard(complianceStandardId: $complianceStandardId, input: $input)
}
```

### Update Review Configurations - Section

**Additional Variables**

- `sectionTitle`: The title property of the section.

```graphql
mutation ConfigureRecurringComplianceReviewsForSection($complianceStandardId: ID!, $sectionTitle: String!, $input: ConfigureRecurringComplianceReviewInput!) {
  configureRecurringComplianceReviewsForSection(complianceStandardId: $complianceStandardId, sectionTitle: $sectionTitle, input: $input)
}
```

### Update Review Configurations - Domain

**Additional Variables**

- `domainTitle`: The title property of the domain.

```graphql
mutation ConfigureRecurringComplianceReviewsForDomain($complianceStandardId: ID!, $domainTitle: String!, $input: ConfigureRecurringComplianceReviewInput!) {
  configureRecurringComplianceReviewsForDomain(complianceStandardId: $complianceStandardId, domainTitle: $domainTitle, input: $input)
}
```

### Update Review Configurations - Requirement/Control

**Additional Variables**

- `ref`: The reference number of the
  requirement/control.

**Query**

```graphql
mutation ConfigureRecurringComplianceReviewForRef($complianceStandardId: ID!, $ref: String!, $input: ConfigureRecurringComplianceReviewInput!) {
  configureRecurringComplianceReviewForRef(complianceStandardId: $complianceStandardId, ref: $ref, input: $input)
}
```

## Add Queries to Compliance Framework

To be added.

## Get Requirement/Control Evidence - Queries 

This query is used to retrieve a list of all queries (and their properties) that
have been attached to a control/requirement as evidence.

**Variables**

- `complianceStandard`: The name of the compliance standard.
- `complianceStandardRecordId`: The unique identifier of the
  requirement/control.
- `complianceStandardRequirement`: The reference number of the
  requirement/control.

```graphql
query solo_ListQuestions($complianceStandard: String!, $complianceStandardRecordId: String!, $complianceStandardRequirement: String!) {
  complianceRequirement(complianceStandard: $complianceStandard, complianceStandardRecordId: $complianceStandardRecordId, complianceStandardRequirement: $complianceStandardRequirement) {
    questions {
      id
      title
      description
      tags
      queries {
        name
        query
        version
        resultsAre
        lastResult {
          recordCount
          lastUpdatedTimestamp
        }
      }
    }
  }
}
```

## Get Control/Requirement Evidence - Links

This query is used to retrieve a list of all links that have been attached to a
control/requirement as evidence.

**Variables**

- `requirementId`: The complianceStandardId of the framework and ref of the
  specific control/requirement in the following format -
  `complianceStandardId:00000000-0000-0000-0000-000000000000:ref:1.1`.

```graphql
query GetRequirementEvidenceLinks($requirementId: String!) {
  listComplianceUserEvidencesForRequirement(requirementId: $requirementId) {
    evidences {
      id
      type
      name
      createTimestamp
      lastUpdatedTimestamp
      description
      linkUrl
    }
  }
}
```

## Get Control/Requirement Evidence - Uploads

This query is used to retrieve a list of all uploads that have been attached to
a control/requirement as evidence.

**Variables**

- `requirementId`: The complianceStandardId of the framework and ref of the
  specific control/requirement in the following format -
  `complianceStandardId:00000000-0000-0000-0000-000000000000:ref:1.1`.

```graphql
query GetRequirementEvidenceUploads($requirementId: String!) {
  complianceUserEvidences(requirementId: $requirementId, type: EXTERNAL_UPLOAD) {
    evidences {
      id
      type
      name
      createTimestamp
      lastUpdatedTimestamp
      description
      ... on ComplianceUserEvidenceWithExternalUpload {
        uploadDetails {
          id
          filename
        }
      }
    }
  }
}
```

## Get Control/Requirement Evidence - Notes

This query is used to retrieve a list of all notes that have been attached to a
control/requirement as evidence.

**Variables**

- `requirementId`: The complianceStandardId of the framework and ref of the
  specific control/requirement in the following format -
  `complianceStandardId:00000000-0000-0000-0000-000000000000:ref:1.1`.

```graphql
query GetRequirementEvidenceNotes($requirementId: String!) {
  listComplianceNotesForRequirement(requirementId: $requirementId) {
    notes {
      id
      userId
      email
      createTimestamp
      lastUpdatedTimestamp
      body
    }
  }
}
```

## Create/Update/Delete Control/Requirement Evidence - Links

To be added.

## Create/Update/Delete Control/Requirement Evidence - Uploads

Currently not supported via API.

## Create/Update/Delete Control/Requirement Evidence - Notes

To be added.
