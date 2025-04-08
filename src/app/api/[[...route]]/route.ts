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

app.get('/search',async (c) =>{


    const {UPSTASH_REDIS_REST_TOKEN,UPSTASH_REDIS_REST_URL} = env<EnvConfig> (c)

    const redis =  new Redis({
        token:UPSTASH_REDIS_REST_TOKEN,
        url:UPSTASH_REDIS_REST_URL

    })


    const query = c.req.query("q")

    if(!query){
        return c.json({message:"query is required"},{status:400})
    }

    const res = []
    const rank = await redis.zrank("terms", query)

    if (rank !== null && rank !== undefined){
        const temp = await redis.zrange<string[]>("terms", rank, rank +100)

        for (const el of temp){
            if(!el.startsWith(query)){
                break
            }

            if(el.endsWith("*")){
                res.push(el.substring(0,el.length - 1))
            }
        }
    }
    return c.json({})
})

// compatable with next 

export const GET = handle(app)

export default app as never