import Link from "next/link";
import { forwardRef } from "react";

const SideBar = forwardRef(({ showNav }, ref) => {

    return (
        <aside ref={ref} className="fixed w-48 h-full bg-white shadow-sm">
            <div className="bg-warning sticky top-0 left-0 right-0 flex justify-center items-center h-16">
                Logo
            </div>

            <div className="bg-success flex flex-col px-4 overflow-auto transition-all ease-linear h-full">
                <Link href="/">Manage Live</Link>
                <Link href="/account">Manage App</Link>
                <Link href="/billing">Fixture</Link>

            </div>
        </aside>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;