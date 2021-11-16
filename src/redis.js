import redis from "redis";
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on("error", function (error) {
  console.error(error);
});

export default client

