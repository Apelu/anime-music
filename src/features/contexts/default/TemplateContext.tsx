import { createContext, useContext, useReducer } from "react";

const MyContext = createContext<MyData | null>(null);
const MyDispatchContext = createContext<React.Dispatch<MyAction> | null>(null);

export enum MyActionType {
    Placeholder = "Placeholder",
}

interface MyAction {
    type: MyActionType;
    payload?: any;
}

interface MyData {}

const initialData = getInitialData();

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

function getInitialData() {
    return {};
}

export function MyProvider({ children }: { children: JSX.Element }) {
    const [data, dispatch] = useReducer(myReducer, initialData);

    return (
        <MyContext.Provider value={data}>
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
