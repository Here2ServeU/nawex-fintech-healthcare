# NERP FinTech & Healthcare Architecture

## Layers

### 1. Ingestion Layer

Kafka receives events from:

- FinTech transactions
- Healthcare patient events
- Operational events

### 2. Processing Layer

Kafka Streams / Apache Flink:

- enrich data
- normalize events
- compute risk indicators
- prepare analytics records

### 3. Flexible Data Storage

MongoDB stores:

- semi-structured events
- patient records
- transaction documents
- evolving domain schemas

### 4. Analytics Layer

OpenSearch provides:

- indexed search
- analytics
- aggregations
- dashboard-ready queries

### 5. Access Layer

Express APIs expose:

- ingestion endpoints
- record retrieval
- search endpoints
- analytics queries

### 6. Dashboard Layer

React provides:

- FinTech operational dashboards
- Healthcare monitoring dashboards
- search and visualization interfaces
