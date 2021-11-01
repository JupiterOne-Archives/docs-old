# Understanding JupiterOne

JupiterOne (J1) is a cloud-native security platform that connects across your siloed security tools, 
empowering unobstructed visibility into security risks across your entire cyber asset universe. 
This extensible platform connects the dots between complex relationships and data, providing 
ultimate visibility to your environment, infrastructure, and operations.

## Using J1 Integrations

The first step in using J1 is to bring your data into J1. There are numerous 
ready-made integrations that are easy to install and use to achieve 
end-to-end cyber asset visibility, context, and automation across every 
dimension of your digital universe. J1 provides [instructions](../configure-integrations.md) on how 
to import the data to J1 and understand the data model and mapping.

## J1 Apps

JupiterOne has separate apps that assist you in all the major components of
security management. Click ![](../assets/icons/apps.png) to view the apps.

![](../assets/jl-apps.png)

### Assets

After you import your data, you can analyze and visualize your complete 
infrastructure and [security cyber asset inventory](../asset-inventory-filters.md) using the J1 Assets app. 
In addition, the Assets app helps you can understand the types and classes 
of cyber assets you have, and the relationships between them. 

### Policies

The JupiterOne Policies app enables you to articulate your organization policies 
and associate them to your compliance requirements. 

Each policy and procedure document is written in its own individual Markdown file, 
and you can configure each policy file to link to other files. The templates are 
open-source that you can edit directly online using the Policies app.

To help you get started, JupiterOne provides 120+ [policy and procedure templates](../manage-policies/policies-app.md) to 
help your organization build your security program and operations. These 
templates derive from JupiterOne company internal policies and procedures, 
and have been through several rounds of compliance assessments.

### Alerts

JupiterOne enables you to [configure alert rules](../manage-alerts.md) in the Alerts app, using any JupiterOne 
Query Language query for continuous auditing and threat monitoring. You must 
have at least one active alert rule to trigger any alert. The easiest way to add some 
rules to an alert is to import rule packs that JupiterOne provides. You can 
also create custom rules.  

### Compliance

JupiterOne provides a flexible platform for you to manage any 
compliance standard or framework as a set of controls or requirements. 
The platform enables you to:

- [Import a compliance standard or security questionnaire](../compliance/compliance-import.md)
- [Map policy procedures to each control or requirement](../compliance/compliance-mapping-policies.md)
- [Map data-driven compliance evidence by query questions](../compliance/compliance-mapping-evidence.md)
- [Perform automated gap analysis based on query results](../compliance/compliance-gap-analysis.md)
- [Export compliance artifacts (summary or full evidence package)](../compliance/compliance-export.md)

### Graph Viewer

JupiterOne is built on a [data-driven graph](../quickstart-graph.md) platform. JupiterOne Query Language (J1QL) is 
designed to traverse this graph and return a sub-graph or data from the entities and 
edges (such as relationships) of a sub-graph. You can view and interact with 
the sub-graph from any J1QL query result.

### Insights

The [JupiterOne Insights app](../insights-dashboards.md) enables you to build reporting dashboards using J1QL queries.

You can configure each dashboard as either a team board that is shared with other 
account users or a personal board for the individual user. The layout of each board is 
individually saved per user, including the layout for team boards, so that each user can 
configure layouts according to their own preferences without impacting others. Administrators 
can save a team board layout as the default for other users.

You can build your own custom dashboards or utilize any of the existing boards that 
JupiterOne has already built.

## Query Library

JupiterOne has hundreds of prebuilt and categorized queries for assessing
the current state of your cyber assets. You can filter the queries on a specific
topic, clone existing queries to create custom queries of your own, and save
frequent searches for easy future reference. Click ![](../assets/icons/query-library.png)on the J1 landing page 
to access the J1 query library.

 ![](../assets/j1-query-library.png)

## Ask Anything

In addition to using the J1 query library, from any J1 page or app, you 
can enter questions in the search bar. By default, J1 autocompletes 
the text and lists any questions related to your keywords. ![](../assets/j1-ask-anything.png)

## JupiterOne Query Language

The [JupiterOne Query Language](../docs/jupiterone-query-language) (J1QL) is a query language for 
finding the entities and relationships within your digital 
environment. J1QL blends together the capabilities of 
asking questions, performing full text search, and querying 
the complex entity-relationship graph.

J1QL is complex but a [tutorial](../tutorial-j1ql.md) is available to help you learn.
In addition, JupiterOne offers [J1VQB](j1-vqb), a visual query building app,
a codefree tool for creating queries.

### 

