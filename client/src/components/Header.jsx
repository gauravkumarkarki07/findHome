import {Link} from 'react-router-dom';


export default function Header() {
  return (
    <header>
        <nav className="flex justify-between px-14 items-center py-2 bg-cyan-800 font-semibold text-white">
            <div className='text-2xl'>
                <Link to='/' className='hover:text-cyan-950'>
                    <span>find</span>
                    <span className='text-cyan-950'>Home</span>
                </Link>
            </div>
            <ul className='flex gap-5 items-center'>
                <Link to='/' className='hover:bg-cyan-950 px-2 py-2 rounded-lg'>
                    <li>Home</li>
                </Link>
                <Link to='/aboutus'className='hover:bg-cyan-950 px-2 py-2 rounded-lg' >
                    <li>AboutUs</li>
                </Link>
            </ul>
            <div>
                <Link to='/login' className='hover:bg-cyan-950 px-2 py-2 rounded-lg'>
                    <span>Login</span>
                </Link>
            </div>
        </nav>
    </header>
  )
}
