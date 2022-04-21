import React, {FC, ReactChild, ReactChildren, useEffect, useState} from 'react';
import {host} from "../Environment";

interface PrivateRouteProps {
    children: ReactChild | ReactChildren
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        fetch(`${host}/Authorization/check`)
            .then(res => {
                if (res.status === 200) {
                    setIsAuth(true)
                }
            })
    },[])

    if (!isAuth) {
        return null
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;