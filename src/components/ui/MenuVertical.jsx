import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';





export default function MenuVertical() {

    return (<>
        <NavigationMenu.Root orientation="vertical" delayDuration={3000} className='flex flex-col gap-2'>

            <NavigationMenu.List className='flex flex-col gap-2' >
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">
                        Damas <CaretDownIcon height={28} aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className='flex flex-col gap-1' >
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas?oferta=true" className='font-bold text-purple-950  py-2 pl-10 text-left bg-yellow-100 w-full'>Ofertas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Todo Damas</a>
                        </NavigationMenu.Link>

                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/dormilonas" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Dormilonas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/short" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Short</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/Pantalon" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Pantalon</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/capri" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Capri</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/levantadoras" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Levantadoras</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/bragas" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Bragas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/maternas" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Maternas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/damas/TALLAS GRANDES" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Tallas Grandes</a>
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>


            <NavigationMenu.List className='flex flex-col gap-2' >
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">
                        <a href="/display/niñas" className='w-full  text-left' >Niñas</a>
                        {/* Caballeros <CaretDownIcon aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" /> */}
                    </NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.List>


            <NavigationMenu.List className='flex flex-col gap-2'>
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">
                        Caballeros <CaretDownIcon height={28} aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className='flex flex-col gap-1' >
                        <NavigationMenu.Link asChild >
                            <a href="/display/caballeros?oferta=true" className='font-bold text-purple-950  py-2 pl-10 text-left bg-yellow-100 w-full'>Ofertas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/caballeros" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Todo Caballeros</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/caballeros/short" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Short</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/caballeros/pantalon" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Pantalón</a>
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>


            <NavigationMenu.List className='flex flex-col gap-2' >
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">
                        <a href="/display/niños" className='w-full  text-left' >Niños</a>
                        {/* Caballeros <CaretDownIcon aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" /> */}
                    </NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.List className='flex flex-col gap-2'>
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">Bebés <CaretDownIcon height={28} aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className='flex flex-col gap-1' >
                        <NavigationMenu.Link asChild >
                            <a href="/display/bebe?oferta=true" className='font-bold text-purple-950  py-2 pl-10 text-left bg-yellow-100 w-full'>Ofertas</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/bebe/varon" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Bebé Varón</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/bebe/hembra" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Bebé Hembra</a>
                        </NavigationMenu.Link>
                        <NavigationMenu.Link asChild >
                            <a href="/display/bebes/oferta" className='font-bold text-purple-950  py-2 pl-10 text-left bg-fondoSubOpcionSideBar w-full'>Bebé Ofertas</a>
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>


            <NavigationMenu.List className='flex flex-col gap-2' >
                <NavigationMenu.Item className='flex flex-col gap-1'>
                    <NavigationMenu.Trigger className="group flex items-center gap-1  text-white text-xl py-2 pl-8 bg-moradobasico w-full ">
                        <a href="/display/pantuflas" className='w-full  text-left' >Pantuflas</a>
                        {/* Caballeros <CaretDownIcon aria-hidden className="w-8   text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" /> */}
                    </NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.List>


        </NavigationMenu.Root>


    </>)
}








