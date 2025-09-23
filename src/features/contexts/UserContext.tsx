import { createContext, useContext, useReducer } from "react";

export const userStorageKey = "animeUser";

const UserContext = createContext<UserData | null>(null);
const UserDispatchContext = createContext<React.Dispatch<UserAction> | null>(
    null
);

export enum UserActionType {
    Placeholder = "Placeholder",
    HandleLogin = "HandleLogin",
}

interface UserAction {
    type: UserActionType;
    payload?: any;
}
/*
const hash = new URLSearchParams(location.hash.replace("#", "?"));
    const hashData = {
        access_token: hash.get("access_token"),
        token_type: hash.get("token_type"),
        expires_in: hash.get("expires_in"),
    };
*/
interface UserData {
    id: string;
    username: string;
    isLoggedIn: boolean;
    aniList?: {
        access_token?: string;
        token_type?: string;
        expires_in?: string;
    };
}

const initialUserData = getIntialData();

function getIntialData() {
    if (localStorage.getItem(userStorageKey)) {
        var storedData = JSON.parse(
            localStorage.getItem(userStorageKey) as string
        );

        return storedData;
    }

    return {
        id: "",
        isLoggedIn: false,
        username: "",
    };
}

function userReducer(data: UserData, action: UserAction) {
    switch (action.type) {
        case UserActionType.Placeholder:
            return {
                ...data,
                // payload: action.payload,
            };

        case UserActionType.HandleLogin:
            if (action.payload && action.payload.id) {
                var newState = {
                    ...data,
                    isLoggedIn: true,
                    ...action.payload,
                };
                localStorage.setItem(userStorageKey, JSON.stringify(newState));
                return newState;
            }

            return {
                ...data,
            };

        default:
            throw new Error("Unknown action type");
    }
}

export function UserProvider({ children }: { children: JSX.Element }) {
    const [userData, dispatch] = useReducer(userReducer, initialUserData);

    return (
        <UserContext.Provider value={userData}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export function useUserData() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
}

export function useUserDispatch() {
    const context = useContext(UserDispatchContext);
    if (!context) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}
