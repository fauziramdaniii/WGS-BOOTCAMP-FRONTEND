import { Link } from 'react-router-dom'

function NotFound () {
  return (
    <div className='not-found'>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for might be in another universe.</p>
      <p>
        Go To The Link <Link to='/'>Homepages</Link>
      </p>
    </div>
  )
}

export default NotFound
