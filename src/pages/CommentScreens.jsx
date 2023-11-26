import { faker } from '@faker-js/faker'
import React from 'react'

const Comment = () => {
  let comments = []

  for (let i = 0; i < 5; i++) {
    const name = faker.person.fullName()
    const avatar = faker.image.avatar()
    const date = faker.date.recent().toLocaleTimeString()
    const commentText = faker.lorem.sentence()

    comments.push({
      name,
      avatar,
      date,
      commentText
    })
  }

  return (
    <div className='ui container comments'>
      {comments.map((comment, index) => (
        <div key={index} className='comment'>
          <a href='/' className='avatar'>
            <img src={comment.avatar} alt='avatar' />
          </a>
          <div className='content'>
            <a href='/' className='author'>
              {comment.name}
            </a>
            <div className='metadata'>
              <span className='date'>{comment.date}</span>
            </div>
            <div className='text'>{comment.commentText}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comment
