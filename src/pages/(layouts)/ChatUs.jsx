import React from 'react'
import { faker } from '@faker-js/faker'

const data = [
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: faker.date.recent().toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString(),
    commentText: faker.lorem.sentence()
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: faker.date.recent().toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString(),
    commentText: faker.lorem.sentence()
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: faker.date.recent().toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString(),
    commentText: faker.lorem.sentence()
  }
]

class Comment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render () {
    const comments = Array.isArray(this.props.data)
      ? this.props.data
      : [this.props.data]
    console.log(comments)
    return comments.map((dataComment, index) => (
      <div className='commentContainer' key={index}>
        <CommentContainer
          avatar={dataComment.avatar}
          name={dataComment.name}
          day={dataComment.date}
          time={dataComment.time}
          comment={dataComment.commentText}
        />
      </div>
    ))
  }
}

class CommentContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      like: this.getLikeFromLocalStorage() || 0
    }
  }

  getLikeFromLocalStorage () {
    return parseInt(localStorage.getItem('likeCount')) || 0
  }

  setLikeToLocalStorage (like) {
    localStorage.setItem('likeCount', like)
  }

  handleLike = () => {
    if (this.state.like === 1) {
      return
    }

    this.setState(
      prevState => ({
        like: prevState.like + 1
      }),
      () => {
        this.setLikeToLocalStorage(this.state.like)
      }
    )
  }

  render () {
    return (
      <div className='comment-container'>
        <div className='comment'>
          <div className='comment-content'>
            <div className='metadata'>
              <span className='date'>
                {this.props.day} at {this.props.time} |
              </span>
              <span className='liked'>Liked {this.state.like}</span>
            </div>
            <div className='text'>{this.props.comment}</div>
            <button className='like-button' onClick={this.handleLike}>
              Like
            </button>
          </div>
          <a href='/' className='avatar'>
            <img
              className='avatar-image'
              src={this.props.avatar}
              alt={this.props.avatar}
            />
          </a>
        </div>
      </div>
    )
  }
}

const ChatUs = () => {
  return <div>{<Comment data={data} />}</div>
}

export default ChatUs
