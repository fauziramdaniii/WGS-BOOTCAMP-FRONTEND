import { NavLink, Outlet } from 'react-router-dom'

function HelpLayouts () {
  return (
    <div className='help-layout'>
      <h2>Website Help</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolorum
        sint cumque. Inventore amet hic illo omnis quo dolor animi, tempora
        veritatis praesentium natus. Assumenda explicabo voluptatibus dolorum
        enim a.
      </p>

      <nav>
        <NavLink to='faq'>View The FAQ</NavLink>
        <NavLink to='contact'>Contact Us</NavLink>
      </nav>

      <Outlet />
    </div>
  )
}
export default HelpLayouts
