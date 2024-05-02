
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';




export function HorizontalMenuBar() {

  return (

    <div
      className="w-full bg-moradobasico text-white text-lg
    py-0.5 px-1 md:px-4 flex justify-evenly items-center"
    >

      <HorizontalMenuBarOneOptionDamas client:load />
      <a href="/display/niñas">Niñas</a>
      <HorizontalMenuBarOneOptionCaballeros client:load />
      <a href="/display/niños">Niños</a>
      <HorizontalMenuBarOneOptionBebes client:load />
      <a href="/display/pantuflas">Pantuflas</a>

    </div>
  )
}



export function HorizontalMenuBarOneOptionDamas() {

  return (<>
    <NavigationMenu.Root orientation="horizontal" delayDuration={1000} className="">

      <NavigationMenu.List className='  ' >

        <NavigationMenu.Item className=' '>

          <NavigationMenu.Trigger className="group flex items-center gap-1  text-white   pl-8 bg-moradobasico    ">
            Damas  <CaretDownIcon height={24} width={24} className="  text-white " />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className=' grid grid-cols-2 gap-4  p-4 w-fit border-4 border-moradobasicoOscuro/40 rounded-2xl' >
            <NavigationMenu.Link asChild >
              <a href="/display/damas" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Todo Damas</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/damas/dormilonas" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Dormilonas</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/short" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Short</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/Pantalon" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Pantalon</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/capri" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Capri</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/levantadoras" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Levantadoras</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/bragas" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Bragas</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/maternas" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Maternas</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas/TALLAS GRANDES" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Tallas Grandes</a>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild >
              <a href="/display/damas?oferta=true" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-yellow-300 '>Ofertas</a>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

      </NavigationMenu.List>

      <div className=" absolute rounded-2xl  mt-2 bg-moradobasico/70 transform-all  transition data-[state=open]:-rotate-180 duration-1000  scale-100 ">
        <NavigationMenu.Viewport className=' ' />
      </div>


    </NavigationMenu.Root>


  </>)
}



export function HorizontalMenuBarOneOptionCaballeros() {

  return (<>
    <NavigationMenu.Root orientation="horizontal" delayDuration={1000} className="">
      <NavigationMenu.List className='  ' >
        <NavigationMenu.Item className=' '>

          <NavigationMenu.Trigger className="group flex items-center gap-1  text-white   pl-8 bg-moradobasico    ">
            Caballeros  <CaretDownIcon height={24} width={24} aria-hidden className="  text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className=' grid grid-cols-2 gap-4  p-4 w-fit border-4 border-moradobasicoOscuro/40 rounded-2xl' >
            <NavigationMenu.Link asChild >
              <a href="/display/caballeros" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Todo Caballeros</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/caballeros/short" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Short</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/caballeros/Pantalon" className='w-full min-w-64 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Pantalon</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/caballeros?oferta=true" className='w-full min-w-48 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-yellow-300 '>Oferta</a>
            </NavigationMenu.Link>

          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className=" absolute rounded-2xl      mt-2 bg-moradobasico/70  ">
        <NavigationMenu.Viewport />
      </div>

    </NavigationMenu.Root>
  </>)
}


export function HorizontalMenuBarOneOptionBebes() {

  return (<>
    <NavigationMenu.Root orientation="horizontal" delayDuration={1000} className="">
      <NavigationMenu.List className='  ' >
        <NavigationMenu.Item className=' '>

          <NavigationMenu.Trigger className="group flex items-center gap-1  text-white   pl-8 bg-moradobasico    ">
            Bebés  <CaretDownIcon height={24} width={24} aria-hidden className="  text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className=' grid grid-cols-2 gap-4  p-4 w-fit border-4 border-moradobasicoOscuro/40 rounded-2xl' >
            <NavigationMenu.Link asChild >
              <a href="/display/bebe/varon" className='w-full min-w-48 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Bebés Varón</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/bebe/hembra" className='w-full min-w-48 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-fondoSideBar '>Bebés Hembra</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link asChild >
              <a href="/display/bebe?oferta=true" className='w-full min-w-48 text-center text-xl p-4  rounded  text-white   bg-moradobasico border-4 border-yellow-300 '>Ofertas</a>
            </NavigationMenu.Link>

          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className=" absolute rounded-2xl     mt-2 bg-moradobasico/70  ">
        <NavigationMenu.Viewport />
      </div>

    </NavigationMenu.Root>
  </>)
}








