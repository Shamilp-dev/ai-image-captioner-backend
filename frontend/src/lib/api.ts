import axios from 'axios'

export async function requestCaption(file: File, style: 'short' | 'descriptive' | 'keywords', modelHint?: string) {
  const form = new FormData()
  form.append('image', file)
  form.append('style', style)
  if (modelHint) form.append('model', modelHint)

  const res = await axios.post('/api/caption', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data as { caption: string; latencyMs: number; model: string }
}