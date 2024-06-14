'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiConstruct3 } from "react-icons/si";
export default function SideBar() {
    const [toggleNavbar,setToggleNavbar]=useState(false)
    const pathname=usePathname()
    return (
        <>
            <div className={`flex  w-full h-[20%] justify-between gap-4 items-center px-[2rem] pt-4 `}>
                <GiHamburgerMenu onClick={() => setToggleNavbar(!toggleNavbar)} className="text-2xl block cursor-pointer" />
                <div className="w-full flex justify-center">
                    <Link className="flex gap-2 w-min items-center" href={'/'}><SiConstruct3 className="text-5xl text-white" /><p className="text-2xl">Taskade</p></Link>
                </div>
                <div onClick={() => setToggleNavbar(!toggleNavbar)} className={`${toggleNavbar ? 'block' : 'hidden'} absolute left-0 top-0 bg-[#181717cc] z-[333] h-full w-full `}>
                    <div className="flex flex-col w-1/2 bg-[#030320] px-8 pt-8 h-full gap-4">
                        <SiConstruct3 className="text-5xl text-white" />
                        <div className={`flex flex-col  h-full  gap-4`}>
                            <div>
                                <Link className={`${pathname == '/matrix' ? 'text-blue-400' : 'text-white'}`} href={'/matrix'}>Matrix</Link>
                            </div>
                            <div>
                                <Link className={`${pathname == '/calendar' ? 'text-blue-400' : 'text-white'}`} href={'/calendar'}>Calendar</Link>
                            </div>
                            <div>
                                <Link className={`${pathname == '/starred-items' ? 'text-blue-400' : 'text-white'}`} href={'/starred-items'}>Starred Items</Link>
                            </div>
                            <div>
                                <Link className={`${pathname == '/settings' ? 'text-blue-400' : 'text-white'}`} href={'/settings'}>Settings</Link>
                            </div>
                            <div>
                                <Link className={`${pathname == '/user-profile' ? 'text-blue-400' : 'text-white'}`} href={'/user-profile'}>User Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <IoIosArrowForward className="text-xl absolute right-[-1.5rem]"/> */}
            </div>
        </>
    )
}