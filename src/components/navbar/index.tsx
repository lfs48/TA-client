import Notifications from "./notifications";
import Logout from "./logout";
import NavLeft from "./nav-left";

export default function Navbar() {

    return(
        <nav className="h-nav sticky top-0 flex justify-between items-center px-12 space-x-6 bg-agency-red border-b-2 border-agency-red-500">
            <div>
                <NavLeft />
            </div>
            <div className="flex space-x-4">
                <Notifications />
                <Logout />
            </div>
            
        </nav>
    )
}