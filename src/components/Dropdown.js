import React from 'react';
import MenuItem from './MenuItem';

function Dropdown({ submenu, dropdown, depthLevel }) {
    const nextDepthLevel = depthLevel + 1; // Increment for nested dropdowns
    const dropdownClass = nextDepthLevel > 1 ? "dropdown-submenu" : "";

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
            {submenu.map((submenuItem, index) => (
                <MenuItem items={submenuItem} key={index} depthLevel={nextDepthLevel} />
            ))}
        </ul>
    );
}

export default Dropdown;
