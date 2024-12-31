import React from 'react'
function SidebarItems({icon,text,active,alert}) {
  return (
    <li className='flex mt-5'>
        <img src={icon} height={30} width={30} alt='hi'/>
        <span className='ml-2'>{text}</span>
    </li>
  )
}

export default SidebarItems
