import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"
// compatible with cloudflare and vercel

const app = new Hono().basePath('/api')

type EnvConfig = {
    UPSTASH_REDIS_REST_TOKEN: string
    UPSTASH_REDIS_REST_URL: string
  }

app.get('/search', (c) =>{
    return c.json({})
})

// compatable with next 

export const GET = handle(app)

export default app as never