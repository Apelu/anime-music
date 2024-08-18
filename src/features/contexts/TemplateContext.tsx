import { createContext, useContext, useReducer } from "react";

const MyContext = createContext<MyData | null>(null);
const MyDispatchContext = createContext<React.Dispatch<MyAction> | null>(null);

export function MyProvider({ children }: { children: JSX.Element }) {
    const [displaySettings, dispatch] = useReducer(myReducer, intialData);

    return (
        <MyContext.Provider value={displaySettings}>
            <MyDispatchContext.Provider value={dispatch}>
                {children}
            </MyDispatchContext.Provider>
        </MyContext.Provider>
    );
}

export function useMyData() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyData must be used within a MyProvider");
    }
    return context;
}

export function useMyDispatch() {
    const context = useContext(MyDispatchContext);
    if (!context) {
        throw new Error("useMyDispatch must be used within a MyProvider");
    }
    return context;
}

function myReducer(data: MyData, action: MyAction) {
    switch (action.type) {
        case MyActionType.Placeholder:
            return {
                ...data,
                // payload: action.payload,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export enum MyActionType {
    Placeholder = "Placeholder",
}

interface MyAction {
    type: MyActionType;
    payload?: any;
}

interface MyData {}

const intialData = {};
