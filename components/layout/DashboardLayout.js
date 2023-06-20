"use client"

import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Footer from "../global/Footer";
import SideBar from "../global/Sidebar";
import TopBar from "../global/Topbar";
export default function Layout({ children }) {
    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    function handleResize() {
        if (window.innerWidth <= 640) {
            setShowNav(false);
            setIsMobile(true);
        } else {
            setShowNav(true);
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
            <TopBar showNav={showNav} setShowNav={setShowNav} />
            <Transition
                as={Fragment}
                show={showNav}
                enter="transform transition duration-[400ms]"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform duration-[400ms] transition ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <SideBar showNav={showNav} />
            </Transition>
            <div className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-48" : ""} flex-grow`}>
                <main className="p-2 bg-primary h-full">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
