import { Link } from 'react-router-dom'
import ButtonTypeButton from '../components/buttonTypeButton.jsx'
export default function MyProperties() {
  return (
    <div className='flex flex-col items-center py-5'>
        <div className='flex flex-col gap-4 items-center w-72 justify-center'>
            <h1>My Properties</h1>
            <Link to='/addproperty'>
                <ButtonTypeButton title={'Add New Property'}/>    
            </Link>
        </div>
    </div>
  )
}
