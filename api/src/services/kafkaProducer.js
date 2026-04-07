const { Kafka } = require("kafkajs");
const config = require("../config");

const kafka = new Kafka({
  clientId: "nerp-api",
  brokers: [config.kafkaBroker]
});

const producer = kafka.producer();
let connected = false;

async function connectProducer() {
  if (!connected) {
    await producer.connect();
    connected = true;
  }
}

async function publishEvent(topic, payload) {
  await connectProducer();

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(payload) }]
  });
}

module.exports = {
  publishEvent
};
