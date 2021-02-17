# Guide to writing Custom J1QL Queries

Some Introduction Here

## Leveraging the Graph for Context

The JupiterOne graph is a useful place to start when you want to construct a
custom query around a single entity.

To start, navigate to the Landing page of JupiterOne and type in a basic query,
replacing `DataStore` with the entity class/type you are interested in.

![j1ql-custom-query-landing-bar](image.jpg)

Click on the specific result you are interested in. 
<!-- If you are wanting to create a generalized query for all entities of the same class/type, you can start with any result as an example.  -->
Click on the vertical ellipses to open additional actions then click **Open in
Graph**.

![j1ql-custom-query-result](image.jpg)

A new browser tab will be opened and will run a query that returns a graph
showing everything related to or mapped to the entity via a relationship.

Click on the queried entity and you will see the relationship verbs for each
mapped entity.

![j1ql-custom-query-graph-relationships](image.jpg)

**Hint** You can use the relationship verb `relates to` when you want to see all
nodes related to an entity (see the example query above)

Let's take the following example of understanding who has access to the
resources within an S3 Bucket. In the example above there are a few interesting
relationships that we can further dig into.

- Both Nick and Adam `MANAGE(S)` the bucket
- The bucket `ALLOWS` read access to Everyone
- This bucket `PUBLISHES` to another S3 bucket

We can now update our original query now that we know the relationships that
exist.

`Find DataStore that MANAGES Person` `Find DataStore that ALLOWS Everyone` `Find
DataStore that PUBLISHES DataStore`

**Hint** Relationships can be queried bidirectionally. For example, `Find
DataStore that MANAGES Person` can also be queried as `Find Person that MANAGES
DataStore` and will return the same results in the graph. However, the list view
will return a list of either `DataStore` or `Person` depending on which entity
you `Find`.

**Note** The graph will only show existing relationships. For a comprehensive
list of relationships that are mapped for a specific entity, see the
[integration
guides](https://support.jupiterone.io/hc/en-us/sections/360004247473-Integrations).

We can continue to add to our query by clicking on and expanding nodes in the
graph. To do this, select any node and click on the ellipses.

![j1ql-custom-query-graph-relationships](image.jpg)

From here we see two additional nodes. Both with a class of `AccessPolicy`; an
`aws_iam_policy` and an `aws_s3_bucket_policy`. We can continue to expand these
nodes, taking note of their relationship to the previous nodes as well as the
class/type.

Our final query could be something similar to `Find DataStore that ALLOWS
AccessPolicy that ASSIGNED User`

See the [Data Model -
Overview](https://support.jupiterone.io/hc/en-us/articles/360022903573-Data-Model-Overview)
for a comprehensive list of common properties, entities, and relationships.