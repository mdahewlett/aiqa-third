import { Send } from "lucide-react"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent } from "./components/ui/card"
import React, { useState } from "react"
import { ScrollArea } from "./components/ui/scroll-area"
import ReachMarkDown from "react-markdown"
import { Input } from "./components/ui/input"

function App() {

  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const systemPassword = import.meta.env.VITE_SITE_PASSWORD

  const handleSubmit = async () => {
    if (!query.trim()) {
      setQuery("")
      setResponse("")
      return
    }

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query })
      })

      const data = await res.json()
      setResponse(data.response)
    } catch (err) {
      console.error("API error:", err)
      setResponse("Something went wrong, please try again")
    }

    setQuery('')

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (password === systemPassword) {
      e.preventDefault()
      setIsAuthenticated(true)
      } else {
        alert("Wrong password")
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center w-1/4 mx-auto">
        <Input 
          type="password" 
          id="password"
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleInputKeydown}
          />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="text-muted-foreground md:text-sm italic px-3 py-2">
        <p>Second time's the charm</p>
      </div>
      <div className="flex flex-col justify-center h-full gap-10 w-1/2 mx-auto">
        {response && <Card className="py-0 px-6">
          <CardContent className="relative whitespace-pre-wrap px-1">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white dark:from-background to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white dark:from-background to-transparent z-10" />

            <ScrollArea className="max-h-64 overflow-y-auto py-3">
              <ReachMarkDown>
                {response}
              </ReachMarkDown>
            </ScrollArea>
          </CardContent>
        </Card>}
        <div className="flex items-center gap-2 border rounded-md px-3 py-2">
          <Textarea
            className="border-0 focus-visible:border-0 focus-visible:ring-0 px-0 py-0 shadow-none resize-none"
            placeholder="Ask anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            />
          <Button variant={"secondary"} size={"icon"} onClick={handleSubmit}>
            <Send/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
