# JupiterOne User Documentation Process

#### Objective: To ensure that user documentation that is available for all new and changed features.

To be able to capture all user documentation requirements, it is crucial that we create Jira tickets under the development epic. Currently, each epic has a mandatory field for documentation. Teams must answer yes or no to this field. 

Process:

1. If you need user documentation, in the epic Jira ticket, click Yes in the **Documentation Required?** field.
2. During epic grooming/planning with their product owner, if available, the team lead/scrum master creates a Jira ticket in the DOC project to capture what exactly we need to add to the documentation. 
   - From the point of view of the J1 user, explain what has been added, changed, or deleted from the J1 app, integration, or API.
   - Provide the context and benefit to the user for the change by linking the dev tickets and references to any RFCs.
   - Add the SME who can provide further information and technical validation.
3. The DOC ticket is added to the DOC project backlog, which is prioritized by the product manager.
4. The technical writer grooms and plans the backlog with the product manager according to when new features are released.
5. The technical writer drafts the documentation with the assistance of any base text provided by the developer, SME, and any other contributors.
6. The technical writer creates a PR and requests approval from the SME, PM, and any other contributors.
7. Upon approval, the technical writer merges the PR, and initiates the process of publication.