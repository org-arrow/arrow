import { FC } from "react"

interface Props {
  text: string
}
const Notice: FC<Props> = ({ text }) => {
  return (
    <div className="flex items-center justify-center p-10 border rounded-md text-sm text-gray-600 font-bold">
      {text}
    </div>
  )
}

export default Notice
