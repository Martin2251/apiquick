"use client"

import React, { useEffect, useState } from 'react'


const Home = () => {
  const [input,setInput] = useState<string>('')

  const [searchResults,setSearchResults] = useState<{
    results:string[]
    duration:number
  }>()

  useEffect(() =>{
    const fetchData = async () =>{
      if(!input) return setSearchResults(undefined)

        const res = await fetch(`/api/search?q=${input}`)
    }
    fetchData()
  },[input])
  return (
  <main className='h-screen w-screen grainy '>
  <div className='flex flex-col gap-6 items-center pt-32 duration-500'></div>
    <input type="text" value={input} onChange={(e) =>{
      setInput(e.target.value) 
    }} style={{border:"2px solid green"}} className='text-zinc-900' />
    </main>
  )
}

export default Home
