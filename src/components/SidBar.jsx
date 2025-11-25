import { NavLink } from 'react-router-dom'

const SidBar = ({data = []}) => {
  return (
    <div className='w-[200px] min-h-full bg-white flex flex-col border-r border-[#ddd]'>
      {data.map((ele, idx) => (
        <NavLink className={({isActive}) => [
          'border-b border-[#ddd] p-3 duration-300',
          isActive ? 'bg-[#333] text-white' : 'hover:bg-[#eee]'
        ].filter(Boolean).join(" ")}
         key={idx} to={ele.link}>{ele.name}</NavLink>
      ))}
    </div>
  )
}

export default SidBar