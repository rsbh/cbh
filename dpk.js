const crypto = require("crypto");

const createHash = (value) => {
  return crypto.createHash("sha3-512").update(value).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = createHash(data)
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }


  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate)
  }
  return candidate;
};