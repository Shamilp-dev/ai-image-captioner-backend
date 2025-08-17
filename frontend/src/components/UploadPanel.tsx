import { useCallback, useRef, useState } from 'react'
import { requestCaption } from '../lib/api'
import { UploadCloud, Loader2 } from 'lucide-react'

type Props = {
  onCaption: (text: string) => void
}

export default function UploadPanel({ onCaption }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState<'short' | 'descriptive' | 'keywords'>('short')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const handleCaption = async () => {
    if (!file) return
    setLoading(true)
    try {
      const res = await requestCaption(file, style)
      onCaption(res.caption)
    } catch (err) {
      onCaption('Error: failed to get caption. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 border">
      <div
        className="border-2 border-dashed rounded-2xl p-6 grid place-items-center text-center cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-64 rounded-xl" />
        ) : (
          <div className="flex flex-col items-center gap-2 py-10">
            <UploadCloud />
            <p className="font-medium">Drag & drop or click to upload</p>
            <p className="text-sm text-gray-500">JPG, PNG, WEBP</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
      </div>

      <div className="flex flex-wrap gap-3 items-center mt-4">
        <label className="text-sm text-gray-600">Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as any)}
          className="px-3 py-2 border rounded-xl"
        >
          <option value="short">Short</option>
          <option value="descriptive">Descriptive</option>
          <option value="keywords">Keywords</option>
        </select>

        <button
          onClick={handleCaption}
          disabled={!file || loading}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-soft disabled:opacity-50"
        >
          {loading && <Loader2 className="animate-spin" size={16} />} Generate Caption
        </button>
      </div>
    </div>
  )
}