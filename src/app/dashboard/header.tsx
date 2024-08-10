'use client'

import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link"

const Header = () => {
  return (
    <div className='flex flex-row items-center justify-between px-8 py-8 bg-zinc-900 w-[80%] text-zinc-300 rounded-xl h-[80px]'>
      <div>
        <p className="font-extrabold text-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-lime-300  inline-block text-transparent bg-clip-text">PDsteF</p>
      </div>
      <div className="flex flex-row items-center ">
      <Link href="main">
       <Button variant="ghost">
       <FaSignOutAlt className="text-zinc-400 text-xl mr-2"/>
       Sign out
       </Button>
       </Link>
      </div>
    </div>
  )
}

export default Header