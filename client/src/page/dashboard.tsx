import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../features/dashboard/navbar'
import Header from '../features/dashboard/header'
import MenuProvider from '../provider/menuProvider'
export default function Dashboard() {
    return (
        <MenuProvider>
            <div className=" bg-1 flex w-full text-3">
                <Navbar></Navbar>
                <div className="flex flex-col w-full h-screen">
                    <Header></Header>
                    <div className="overflow-y-auto overflow-x-auto">
                        <div className="m-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </MenuProvider>
    )
}
