import { Send } from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Textarea } from "./components/ui/textarea"
import { useState } from "react"

function App() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = () => {
    if (!query.trim()) {
      setQuery("")
      setResponse("")
      return
    }
    
    setResponse(`You asked: ${query}`)
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="text-muted-foreground md:text-sm italic px-3 py-2">
        <p>Second time's the charm</p>
      </div>
      <div className="flex flex-col justify-center h-full gap-10 w-1/2 mx-auto">
        {response && <Card>
          <CardContent className="whitespace-pre-wrap">{response}</CardContent>
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
