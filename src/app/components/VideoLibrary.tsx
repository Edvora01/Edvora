import { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';
import { getYouTubeThumbnail, getYouTubeWatchUrl, getYouTubeEmbedUrl } from '../utils/youtube';

interface Video {
  id: string;
  title: string;
  url: string;
  description?: string;
}

interface VideoLibraryProps {
  videos: Video[];
}

export function VideoLibrary({ videos }: VideoLibraryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-600">No videos available for this chapter</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white hover:bg-red-700 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-gray-900" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.url)}
                className="w-full h-full"
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
          >
            {/* Video Thumbnail */}
            <div className="relative overflow-hidden bg-gray-900" style={{ aspectRatio: '16/9' }}>
              <img
                src={getYouTubeThumbnail(video.url, 'hq')}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
                >
                  <Play className="w-8 h-8 fill-current" />
                </button>
              </div>

              {/* Duration Badge (optional - you can add duration field to Video interface) */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-semibold">
                Video
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.description}
                </p>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                >
                  <Play className="w-4 h-4" />
                  Watch Now
                </button>
                <a
                  href={getYouTubeWatchUrl(video.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
