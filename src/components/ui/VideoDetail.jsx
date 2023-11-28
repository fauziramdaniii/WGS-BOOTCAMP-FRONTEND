import React from 'react'

const VideoDetail = ({ video, channel }) => {
  if (!video) {
    return <div>Loading...</div>
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

  return (
    <div>
      <h2>{video.snippet.title}</h2>
      <div>
        <iframe
          width='560'
          height='315'
          src={videoSrc}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <p>{video.snippet.description}</p>
      <div>
        <p>
          <strong>Channel:</strong> {video.snippet.channelTitle}
        </p>
      </div>
    </div>
  )
}

export default VideoDetail
