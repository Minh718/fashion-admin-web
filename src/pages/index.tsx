import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
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
            <div className="max-w-screen-xl w-full">
              <Outlet context={{ setActiveItem }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
