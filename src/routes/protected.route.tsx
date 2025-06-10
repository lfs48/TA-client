import { useGetUserQuery } from "@/api/user.api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { useEffect } from "react";
import { logout } from "@/reducers/session.reducer";
import { skipToken } from "@reduxjs/toolkit/query";

export default function ProtectedRoute({children}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
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