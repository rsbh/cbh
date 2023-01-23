const crypto = require("crypto");

const createHash = (value) => {
  return crypto.createHash("sha3-512").update(value).digest("hex");
}

const getEventPartitionKey = (key,) => {
  return typeof key === "string" ? key : JSON.stringify(key);
}

const createEventHashKey = (event) => {
  const data = JSON.stringify(event);
  return createHash(data)
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (event) {
    const partitionKey = event.partitionKey ? getEventPartitionKey(event.partitionKey, MAX_PARTITION_KEY_LENGTH) : createEventHashKey(event);
    return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? createHash(partitionKey) : partitionKey
  }
  return TRIVIAL_PARTITION_KEY;
};