import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div>
      {/* Sidebar fixa */}
      <aside className="fixed left-48 top-0 h-full w-[70px] flex flex-col justify-between items-center py-6">
        <Link href="/home">
        <img src="/logo.png" alt="logo" className="size-11 object-cover cursor-pointer" />
        </Link>
        <Link href="/profile">
          <img
            src="https://i.pinimg.com/736x/cc/f1/16/ccf116d9381fac1c2c3f81c7fe72b9c5.jpg"
            alt="user avatar"
            className="size-12 rounded-lg object-cover cursor-pointer"
          />
        </Link>
      </aside>
    </div>
  )
}