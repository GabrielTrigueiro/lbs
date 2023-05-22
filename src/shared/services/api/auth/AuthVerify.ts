import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { AcessToken } from "../../../contexts";

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props: any) => {
    const location = useLocation();
    useEffect(() => {
        const user = JSON.parse('AcessToken');

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    }, [location, props]);

    return null;
};

export default AuthVerify;