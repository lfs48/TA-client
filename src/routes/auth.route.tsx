import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "@/types";

export default function AuthRoute({children}) {

    const navigate = useNavigate();

    const { authenticated } = useSelector( (state:RootState) => state.session);

    useEffect(() => {
        if (authenticated) {
            navigate('/lobby', { replace: true });
        }
    }, [authenticated, navigate]);
    if (authenticated) {
        return null;
    } else {
        return children
    }
};