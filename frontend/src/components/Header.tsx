import { Camera } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-black text-white grid place-items-center shadow-soft">
          <Camera size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">AI Image Captioner</h1>
          <p className="text-sm text-gray-500">Upload → Caption → Copy</p>
        </div>
      </div>
    </header>
  )
}