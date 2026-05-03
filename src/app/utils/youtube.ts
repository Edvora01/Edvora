/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Get YouTube thumbnail URL from video URL or ID
 * @param url - YouTube URL or video ID
 * @param quality - Thumbnail quality: 'maxres' (1280x720), 'hq' (480x360), 'mq' (320x180), 'default' (120x90)
 */
export function getYouTubeThumbnail(url: string, quality: 'maxres' | 'hq' | 'mq' | 'default' = 'hq'): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    // Return a placeholder if video ID cannot be extracted
    return 'https://via.placeholder.com/480x360?text=Video+Thumbnail';
  }

  const qualityMap = {
    maxres: 'maxresdefault',
    hq: 'hqdefault',
    mq: 'mqdefault',
    default: 'default'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Convert YouTube URL to embed URL
 */
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Convert YouTube URL to watch URL
 */
export function getYouTubeWatchUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/watch?v=${videoId}`;
}
