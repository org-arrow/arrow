import { FC } from "react"
import Header from "./header"

interface Props {
  children: React.ReactNode
}

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  )
}

export default Wrapper
