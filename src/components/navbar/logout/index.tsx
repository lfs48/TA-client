import { RiLogoutBoxLine } from "@remixicon/react";
import { logout } from "@/reducers/session.reducer";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Tooltip } from "react-tooltip";
import { createPortal } from "react-dom";

export default function Logout() {

    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch, logout]);

    return(
        <>
        <button
            className="cursor-pointer"
            onClick={handleLogout}
            data-tooltip-id='logout-tooltip'
            data-tooltip-content='Log Out'
        >
            <RiLogoutBoxLine className='size-[1.75rem]'/>
        </button>
        {createPortal(
            <Tooltip id='logout-tooltip' />
        , document.body)}
        </>
    )
}