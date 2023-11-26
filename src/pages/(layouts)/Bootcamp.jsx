import React, { useEffect, useState } from 'react'
import axios from 'axios'
// function Clock () {
//   // State untuk menyimpan waktu saat ini dalam format string
//   const [clockState, setClockState] = useState(new Date().toLocaleTimeString())

//   // Set interval untuk memperbarui waktu setiap detik
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const date = new Date()
//       setClockState(date.toLocaleTimeString())
//     }, 1000) // Memperbarui setiap detik

//     // Membersihkan interval ketika komponen tidak lagi dipakai
//     return () => clearInterval(intervalId)
//   }, []) // Array dependensi kosong berarti efek ini hanya berjalan sekali saat mounting

//   // Menampilkan waktu pada elemen div
//   return <div style={{ fontSize: '55px', margin: '60px' }}>{clockState}</div>
// }

// export default Clock
// class Clock extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = { date: new Date() }
//   }

//   componentDidMount () {
//     this.timerID = setInterval(() => this.tick(), 1000)
//   }

//   componentWillUnmount () {
//     clearInterval(this.timerID)
//   }

//   tick () {
//     this.setState({
//       date: new Date()
//     })
//   }

//   render () {
//     const { hours, minutes, seconds } = this.state.date

//     return (
//       <article className='clock'>
//         <div className='hours-container'>
//           <div className='hours'>{hours}</div>
//         </div>
//         <div className='minutes-container'>
//           <div className='minutes'>{minutes}</div>
//         </div>
//         <div className='seconds-container'>
//           <div className='seconds'>{seconds}</div>
//         </div>
//         <div>
//           <h1>Hello, World!</h1>
//           <h2>It Is {this.state.date.toLocaleTimeString()} From Indonesia.</h2>
//         </div>
//       </article>
//     )
//   }
// }

// class Bootcamp extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = { value: '' }

//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange (event) {
//     this.setState({ value: event.target.value })
//   }

//   handleSubmit (event) {
//     alert('Nama Kamu Adalah : ' + this.state.value)
//     event.preventDefault()
//   }

//   render () {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type='text'
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <input type='submit' value='Submit' />
//       </form>
//     )
//   }
// }

// export default Bootcamp

// const Bootcamp = () => {
//   const [value, setValue] = useState('')

//   const handleChange = event => {
//     setValue(event.target.value)
//   }

//   const handleSubmit = event => {
//     alert('Nama Kamu Adalah : ' + value)
//     event.preventDefault()
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='field' style={{ textAlign: 'center' }}>
//         <label>
//           Nama:
//           <input
//             type='text'
//             placeholder='Input Name'
//             value={value}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <button className='ui button' type='submit'>
//         Submit
//       </button>
//     </form>
//   )
// }
// axios.create({
//   baseURL: 'https://api.unsplash.com',
//   headers: {
//     Authorization:
//       'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296'
//   }
// })

async function fetchImages (keyword) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: keyword
      },
      headers: {
        Authorization:
          'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296'
      }
    })
    console.log(response)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

function Bootcamp () {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [photos, setPhotos] = useState([])

  const handleSearch = async e => {
    e.preventDefault()

    if (searchKeyword.trim() === '') {
      alert('Search keyword is empty')
      return
    }

    try {
      const results = await fetchImages(searchKeyword)
      setPhotos(results)
    } catch (error) {
      console.error('Error searching for images:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type='search'
          id='search'
          name='search'
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <div className='photo-container'>
        {photos.map(photo => (
          <div key={photo.id} className='box'>
            <a href={photo.links.html} target='_blank'>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bootcamp
