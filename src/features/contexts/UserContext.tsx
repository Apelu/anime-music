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

interface UserData {
    id: string;
    isLoggedIn: boolean;
    username: string;
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
                if (action.payload.username == "Apelu") {
                    action.payload.id = "84f2fafd-1a25-4e18-ad8a-afff07374810";
                }
                var newState = {
                    ...data,
                    isLoggedIn: true,
                    id: action.payload.id,
                    username: action.payload.username,
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
