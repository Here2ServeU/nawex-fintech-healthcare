const { Client } = require("@opensearch-project/opensearch");
const config = require("../config");

const client = new Client({
  node: config.opensearchNode,
  ssl: {
    rejectUnauthorized: false
  },
  auth: {
    username: "admin",
    password: process.env.OPENSEARCH_INITIAL_ADMIN_PASSWORD
  }
});

async function indexDocument(index, document) {
  return client.index({
    index,
    body: document,
    refresh: true
  });
}

async function searchDocuments(index, queryText) {
  return client.search({
    index,
    body: {
      query: {
        multi_match: {
          query: queryText,
          fields: ["*"]
        }
      }
    }
  });
}

module.exports = {
  indexDocument,
  searchDocuments
};
