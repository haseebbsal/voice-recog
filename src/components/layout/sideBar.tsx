'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiConstruct3 } from "react-icons/si";
export default function SideBar() {
    const [toggleNavbar,setToggleNavbar]=useState(false)
    const pathname=usePathname()
    return (
        <>
            <div className={`flex flex-col ${toggleNavbar ? 'w-[30%]' : 'w-[15%]'} sm:w-[15%]  gap-4 items-center px-[2.5rem] pt-4 border-r-2`}>
                <Link href={'/'}><SiConstruct3 className="text-5xl text-white" /></Link>
                <GiHamburgerMenu onClick={()=>setToggleNavbar(!toggleNavbar)} className="text-2xl block sm:hidden" />
                <div className={`${toggleNavbar?'flex':'hidden'} sm:flex flex-col gap-4`}>
                    <div>
                        <Link className={`${pathname=='/matrix'?'text-blue-400':'text-white'}`} href={'/matrix'}>Matrix</Link>
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
        </>
    )
}