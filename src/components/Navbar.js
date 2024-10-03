import React from 'react';
import MenuItem from './MenuItem';
import { menuItemsData } from '../menuItemData';

function Navbar() {
  const depthLevel = 0;

  return (
    <nav className='main-nav'>
      <ul className='menus'>
        {menuItemsData.map((menu, index) => {
          return <MenuItem items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
}

export default Navbar;