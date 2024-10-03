import React, { useState,useEffect,useRef } from 'react';
import Dropdown from './Dropdown';

function MenuItem({ items, depthLevel }) {
  const [dropdown, setDropdown] = useState(false);
  let ref=useRef();
  useEffect(()=>{
    const handler=(event)=>{
        if(dropdown && ref.current && !ref.current.contains(event.target)){
            setDropdown(false);
        }
    }
    document.addEventListener("mousedown",handler); 
    document.addEventListener("touchstart",handler);

    return()=>{
        document.removeEventListener("mousedown",handler);
        document.removeEventListener("touchstart",handler);
    }
  },[dropdown])

  const onMouseEnter = () =>{
    setDropdown(true);
  }


  const onMouseLeave = () =>{
    setDropdown(false);
  }
  return (
    <li className='menu-items' ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title} {' '}
            <span className='arrow'></span>
          </button>

          {/* Pass the submenu and dropdown state to Dropdown component */}
          <Dropdown submenu={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
        </>
      ) : (
        <a href="/#">{items.title}</a>
      )}
    </li>
  );
}

export default MenuItem;