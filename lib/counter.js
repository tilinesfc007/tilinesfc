import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});

await redis.connect();

export async function getCount() {
  const count = await redis.get('download_count');
  return parseInt(count) || 0;
}

export async function incrementCounter() {
  const newCount = await redis.incr('download_count');
  return newCount;
}