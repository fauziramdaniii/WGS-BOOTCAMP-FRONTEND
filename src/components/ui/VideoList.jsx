import React from 'react'

const VideoList = ({ videos, onVideoSelect }) => {
  const video = videos.slice(1)
  return (
    <div className='video-list'>
      <h2 style={{ textAlign: 'center' }}>Recommended Videos</h2>
      {video.map(video => (
        <div
          key={video.id.videoId}
          className='video-list-item'
          onClick={() => onVideoSelect(video)}
        >
          <div className='thumbnail'>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
          </div>
          <div className='description'>
            <h3>{video.snippet.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VideoList
