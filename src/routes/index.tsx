import { 
    Routes,
    Route,
    BrowserRouter
} from "react-router";

import AuthRoute from "./auth.route";
import ProtectedRoute from "./protected.route";
import Landing from "@/pages/landing";
import Lobby from "@/pages/lobby";
import Game from "@/pages/game";
import Navbar from "@/components/navbar";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/'
                    element={
                        <AuthRoute>
                            <Landing />
                        </AuthRoute>
                    }
                />
                <Route 
                    path='/lobby'
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Lobby />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/game/:passphrase'
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Game />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}