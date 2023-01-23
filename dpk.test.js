const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should not returns the literal '0' when input is given", () => {
    const event = { name: "Start" }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe("0");
  });

  it("should return `partitionKey` when `partitionKey` is there in event", () => {
    const event = { name: "Start", partitionKey: "test_key" }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("test_key");
  });

  it("should stringify the `partitionKey` when `partitionKey` is not string", () => {
    const event = { name: "Start", partitionKey: ["test_key"] }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("[\"test_key\"]");
    expect(typeof trivialKey).toBe("string");

  });

  it("should not return partition key with more than 256 length", () => {
    const dummy_key = new Array(300).join("a")
    const event = { name: "Start", partitionKey: dummy_key }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThanOrEqual(256)
  });
});


