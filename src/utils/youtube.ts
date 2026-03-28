export function extractYoutubeId(url: string) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export function parseISO8601Duration(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  const match = duration.match(regex)
  if (!match) return ''

  const hours = match[1] ? parseInt(match[1]) : 0
  const minutes = match[2] ? parseInt(match[2]) : 0
  const seconds = match[3] ? parseInt(match[3]) : 0

  const parts = []
  if (hours > 0) parts.push(hours.toString())
  parts.push(hours > 0 ? minutes.toString().padStart(2, '0') : minutes.toString())
  parts.push(seconds.toString().padStart(2, '0'))

  return parts.join(':')
}
