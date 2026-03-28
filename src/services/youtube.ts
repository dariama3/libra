const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos'

export async function fetchVideoMetadata(videoId: string) {
  const url = `${BASE_URL}?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('YouTube API request failed')
  }

  const data = await response.json()

  return data.items[0]
}
