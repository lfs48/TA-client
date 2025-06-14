import Logout from "./logout";

export default function Navbar() {

    return(
        <nav className="h-nav sticky top-0 flex justify-end items-center px-12 bg-agency-red border-b-2 border-agency-red-500">
            <Logout />
        </nav>
    )
}