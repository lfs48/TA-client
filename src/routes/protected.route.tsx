import { useGetUserQuery } from "@/api/user.api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "@/reducers/session.reducer";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/hooks/useAppSelector.hook";

export default function ProtectedRoute({children}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authenticated, id } = useAppSelector(state => state.session);

    const { data, error } = useGetUserQuery(id ?? skipToken);

    useEffect(() => {
        if (!authenticated) {
            navigate('/', { replace: true });
        }
    }, [authenticated, navigate]);
    
    useEffect( () => {
        if (error) {
            dispatch({
                type: logout.type
            });
        }
    }, [dispatch, error])

    if (authenticated && data) {
        return children;
    } else {
        return null;
    }
};