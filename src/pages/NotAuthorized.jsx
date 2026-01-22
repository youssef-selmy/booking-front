import notauthorized from '../assets/notauthorized.svg'

const NotAuthorized = () => {
  return (
    <div className='flex flex-col gap-20 justify-center items-center w-full h-screen'>
        <img src={notauthorized} alt="" className='w-[400px]' />
        <p className='text-stone-700 font-medium'>You are not authorized to access this page</p>
    </div>
  )
}

export default NotAuthorized