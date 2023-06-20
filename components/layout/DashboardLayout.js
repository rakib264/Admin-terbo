"use client"

import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Footer from "../global/Footer";
import SideBar from "../global/Sidebar";
import TopBar from "../global/Topbar";
export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    function handleResize() {
        if (window.innerWidth <= 640) {
            setSidebarOpen(false);
            setIsMobile(true);
        } else {
            setSidebarOpen(true);
            setIsMobile(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="flex min-h-screen">
            <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Transition
                as={Fragment}
                show={sidebarOpen}
                enter="transform transition duration-[500ms]"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform duration-[500ms] transition ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <SideBar sidebarOpen={sidebarOpen} />
            </Transition>
            <div className={`pt-16 transition-all duration-[500ms] ease-in-out ${sidebarOpen && !isMobile ? "pl-48" : ""} flex-grow`}>
                <main className="p-2 bg-primary h-full">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
