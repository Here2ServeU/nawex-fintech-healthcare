require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  kafkaBroker: process.env.KAFKA_BROKER || "kafka:9092",
  mongoUri: process.env.MONGODB_URI || "mongodb://mongodb:27017/nerp",
  opensearchNode: process.env.OPENSEARCH_NODE || "http://opensearch:9200",
  fintechTopic: process.env.FINTECH_TOPIC || "fintech-transactions",
  healthcareTopic: process.env.HEALTHCARE_TOPIC || "healthcare-events"
};
