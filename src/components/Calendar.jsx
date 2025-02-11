import { useState } from "react"
import { DatePicker } from "./DatePicker"

export default function Calendar({ label }) {
  const [value, setValue] = useState()
  return <DatePicker value={value} onChange={setValue} label={label} />
}