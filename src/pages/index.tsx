import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
export default function Home() {
  const [isOpenSideBar, setIsOpenSideBar] = React.useState(true);
  const toggleSidebar = () => setIsOpenSideBar(!isOpenSideBar);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="flex">
      <div
        className={` transition-all duration-300 ease-in-out ${
          isOpenSideBar ? "w-64" : "w-0"
        }`}
      >
        <Sidebar
          isOpenSideBar={isOpenSideBar}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
      <main className=" flex-grow ">
        <div className="justify-center bg-slate-200 min-h-[100vh]">
          <Header isOpenSideBar={isOpenSideBar} toggleSidebar={toggleSidebar} />
          <div className="flex justify-center">
            <div className="max-w-screen-2xl w-full">
              <div className="container mx-auto px-4 py-8">
                <Outlet context={{ setActiveItem }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
