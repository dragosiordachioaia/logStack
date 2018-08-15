// const redis = require("redis");
// const { promisify } = require("util");
// let client;
// try {
//   client = redis.createClient(process.env.REDIS_URL);
// } catch (e) {}
//
// module.exports = {
//   ...client,
//   getAsync: promisify(client.get).bind(client),
//   setAsync: promisify(client.set).bind(client),
//   keysAsync: promisify(client.keys).bind(client),
// };
