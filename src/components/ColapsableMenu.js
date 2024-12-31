// import React, { useState } from "react";

// function CollapsibleMenu({ children }) {
  // const [collapsed, setCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setCollapsed(!collapsed);
  // };

  // return (
  //   <div
  //     style={{
  //       width: collapsed ? '60px' : '250px', // Collapsed width vs expanded width
  //       transition: 'width 0.3s ease', // Smooth transition for width changes
  //       overflow: 'hidden', // Hide overflow in collapsed state
  //     }}
  //   >
  //     <button onClick={toggleSidebar}>
  //       {collapsed ? 'Expand' : 'Collapse'}
  //     </button>
  //     <nav>
  //       <ul
  //         style={{
  //           display: collapsed ? 'none' : 'block', // Hide menu when collapsed
  //         }}
  //       >
  //         <li>Home</li>
  //         <li>Profile</li>
  //         <li>Settings</li>
  //       </ul>
  //     </nav>
  //   </div>

import React, { useState } from "react";

function CollapsibleMenu({ children }) {
  const [clicked, setClicked] = useState(true);

  const handlePress = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <aside
        className={`h-screen bg-white border-r shadow-sm transition-all duration-500 ease-in-out ${
          clicked ? 'w-[20%]' : 'w-[5%]'
        } overflow-hidden`}
      >
        <nav className='h-full flex flex-col'>
          <div className='p-4 pb-2 flex justify-between items-center'>
            {/* Logo */}
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`transition-opacity duration-500 ease-in-out md:w-24 sm:w-20 image ${
                clicked ? 'opacity-100' : 'opacity-0'
              } w-32`}
              alt="Logo"
            />
            
            {/* Toggle Button */}
            <button
              className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out relative ${clicked ? 'left-[3%]' : 'right-[100%] '}` }
              onClick={handlePress}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="24"
                // height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-first sm:w-4 md:w-6 sm:h-4 md:h-6"
              >
                <path d="m17 18-6-6 6-6" />
                <path d="M7 6v12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <ul className={`flex-1 px-3 transition-opacity duration-500 ease-in-out ${clicked ? 'opacity-100' : 'opacity-0'}`}>
            {children}
          </ul>

          {/* User Info */}
          <div className='border-t flex p-3 transition-all duration-500 ease-in-out'>
            <img
              src="http://ui-avatars.com/api/?background=c7d2fe&color=3730a3&old=true"
              alt="User Avatar"
              className='w-10 h-10 rounded-md'
            />
            <div className={`flex justify-between items-center ml-3 transition-all duration-500 ease-in-out ${clicked ? 'w-52 opacity-100' : 'w-0 opacity-0'}`}>
              <div className='leading-4'>
                <h4 className='font-semibold'>Riya Dhingra</h4>
                <span className='text-xs text-gray-600'>riyadhingra@gmail.com</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default CollapsibleMenu;
