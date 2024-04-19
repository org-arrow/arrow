// ADAPTED FROM: https://ui.shadcn.com/blocks#dashboard-03

import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FC } from "react"
import useSpeechToText from "react-hook-speech-to-text"

const LLMInput: FC = () => {
  const { interimResult, isRecording, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    })

  const toggleRecording = () => 
    isRecording ? stopSpeechToText() : startSpeechToText()

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        value={interimResult}
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleRecording}>
          {<Mic className="size-4" />}
          <span className="sr-only">Use Microphone</span>
        </Button>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default LLMInput
