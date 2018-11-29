# JupiterOne Data Security

This document describe in details the data JupiterOne ingests and how your data
is protected on our platform.

## Data Protection

### Encryption

Data is fully encrypted both at rest and in transit.  This includes all of your
account and user data, as well as operational data imported/ingested into the
JupiterOne platform.

**Data in Transit** is encrypted via TLSv1.2 or later, using SHA-256 with
2048-bit RSA Encryption or equivalent strength cypher.

*Production Domain:* `*.us.jupiterone.io` is the current production domain.

**Data at Rest** is hosted in our product AWS environments, using the managed
RDS/Neptune, DynamoDB, and S3 services. All database instances, tables, and S3
buckets with customer data have server-side encryption enabled, using AWS KMS
for key management. In addition to encryption, managed backup is enabled for the
database clusters. For S3 buckets, cross-account replication is enabled to back
up data to a different region for disaster recovery. All backup data is fully
encrypted the same way as its source.

### Multi-tenancy

JupiterOne is a multi-tenancy, software-as-a-service platform hosted in AWS.
Customer data is logically partitioned/segregated by software via a unique
`accountId` associated with every piece of data. Access to data is restricted to
within each unique account for users granted proper access to that account. This
is a standard pattern used by cloud infrastructure and SaaS providers.

### External Data Ingestion/Import



### Access to Your Environments

### JupiterOne Internal Access to Your Data

## Application Access

### User Access Control

### API Access

### Creating Your Test Environments

### Support Access to Your JupiterOne Account(s)

## Infrastructure and Operational Security

### Zero-Trust Model

