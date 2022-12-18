# Traditional enterprise messaging systems

## Why are traditional enterprise messaging systems not suited for log processing?

- [ ] Collecting log data requires strong delivery guarantees, which traditional
  enterprise messaging systems often do not support.
- [x] Traditional enterprise messaging systems usually suffer from worse
  performance when a lot of messages pile up in the queue.
- [x] Traditional enterprise messaging systems are usually not suited for
  handling very large amounts of data coming in at the same time.

# Kafka efficiency

## Which measures does Kafka take to make the system efficient?

- [ ] Efficient transfer: Kafka chaches messages in memory at the Kafka layer.
- [x] Stateless broker: Brokers do not keep track of what messages have been
  consumed by which consumers, and instead relies on time-based service level
  agreement which defines how long messages are retained.
- [ ] Simple storage: messages stored in Kafka can quickly be randomly-accessed
  using their unique message id.

# Zookeeper

## What is the purpose of Kafka's Zookeeper service?

- [x] To facilitate coordination between consumers.
- [ ] To act as a "master consumer" that coordinates which consumers consumes
  which messages in a centralized manner.
- [x] To keep track of the addition and removal of consumers and brokers.
