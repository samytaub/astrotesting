import React from 'react'

import { useState } from 'react';
import MenuVertical from './MenuVertical';
import { CrossCircledIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { MenuIcon } from 'lucide-react';

export default function Drawer() {



    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="">

            <button
                onClick={toggleMenu}
                className=" text-white -mt-0 md:-mt-2 ml-4 w-12 flex flex-col items-center"
            >
                <MenuIcon className='h-[38px] w-[38px]' strokeWidth={2} />
                <p className=' w-20 text-xs md:text-sm -mt-1 -ml-2  rounded-full bg-moradobasico/60  '>Catálogo</p>
            </button>

            <div className='w-screen cursor-pointer -mt-[2px] ' onClick={toggleMenu}>
                <HorizontalMenuBarDummy />
            </div>

            <div
                className={`   fixed w-1/2 md:w-[20%] top-20 pb-1 md:top-24 left-1 bg-moradobasicoTransparente/60    transform transition-all duration-1000 ${menuOpen ? 'translate-y-0' : '-translate-y-full -translate-x-full scale-0 opacity-0'
                    }`}
            >

                <div className='flex flex-col text-center gap-2'>
                    <div className="flex justify-end pr-2">
                        <button onClick={toggleMenu} className="text-2xl font-bold text-white  mt-2 mr-1 outline-4 outline-white ">
                            <CrossCircledIcon width={32} height={32} />
                        </button>
                    </div>
                    <div className=" h-full w-full  ">

                        {/* Drawer Body */}

                        <MenuVertical />

                        {/* End Drawer Body */}

                    </div>

                </div>

            </div>
        </div >
    );
};


function HorizontalMenuBarDummy() {
    return (
        <div
            className="w-full bg-moradobasico text-white text mt-1
        flex flex-row justify-evenly items-center">
            <a>Damas</a>
            <a>Caballeros</a>
            <a>Niñas</a>
            <a>Niños</a>
            <a>Bebés</a>
            <a>Pantuflas</a>
        </div>
    )
}

