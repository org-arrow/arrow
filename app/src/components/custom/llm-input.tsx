// ADAPTED FROM: https://ui.shadcn.com/blocks#dashboard-03

"use client"

import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FC, useState } from "react"
// import useSpeechToText from "react-hook-speech-to-text"
import { getContract } from "@/utils/provider"
import { toast } from "sonner"

const LLMInput: FC = () => {
  const [prompt, setPrompt] = useState<string>("")

  // const { interimResult, isRecording, startSpeechToText, stopSpeechToText } =
  //   useSpeechToText({
  //     continuous: true,
  //     useLegacyResults: false,
  //   })

  // const toggleRecording = () =>
  //   isRecording ? stopSpeechToText() : startSpeechToText()

  const sendPrompt = async () => {
    const contract = await getContract()

    await contract
      .subscribe(0, 3)
      .then(() => {
        toast.success(`You have just subscribed to service`)
      })
      .catch((e) => toast.error(e))
  }

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">
        Prompt
      </Label>
      <Textarea
        id="message"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button variant="ghost" size="icon" >
          {<Mic className="size-4" />}
          <span className="sr-only">Use Microphone</span>
        </Button>
        <Button
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
          onClick={sendPrompt}
        >
          Send Prompt
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default LLMInput
