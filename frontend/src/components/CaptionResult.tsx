import { useRef } from 'react'
import { Clipboard } from 'lucide-react'

type Props = { text: string }

export default function CaptionResult({ text }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const copy = async () => {
    if (!ref.current) return
    await navigator.clipboard.writeText(ref.current.value)
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Caption</h3>
        <button onClick={copy} className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-xl">
          <Clipboard size={16} /> Copy
        </button>
      </div>
      <textarea ref={ref} value={text} readOnly className="mt-3 w-full h-28 border rounded-xl p-3" />
    </div>
  )
}