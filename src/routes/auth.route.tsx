import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector.hook";

export default function AuthRoute({children}) {

    const navigate = useNavigate();

    const { authenticated } = useAppSelector(state => state.session);

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