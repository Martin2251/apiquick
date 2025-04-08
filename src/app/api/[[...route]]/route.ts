import { Redis } from "@upstash/redis"
import { Hono } from "hono"
import { env } from "hono/adapter"
import { handle } from "hono/vercel"

export const runtime = "edge"
// compatible with cloudflare and vercel

const app = new Hono().basePath('/api')

type EnvConfig = {
    UPSTASH_REDIS_REST_TOKEN: string
    UPSTASH_REDIS_REST_URL: string
  }

app.get('/search', (c) =>{


    const {UPSTASH_REDIS_REST_TOKEN,UPSTASH_REDIS_REST_URL} = env<EnvConfig> (c)

    const redis =  new Redis({
        token:UPSTASH_REDIS_REST_TOKEN,
        url:UPSTASH_REDIS_REST_URL

    })


    const query = c.req.query("q")
    return c.json({})
})

// compatable with next 

export const GET = handle(app)

export default app as never