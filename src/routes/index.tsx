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
                            <Lobby />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/game/:passphrase'
                    element={
                        <ProtectedRoute>
                            <Game />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}