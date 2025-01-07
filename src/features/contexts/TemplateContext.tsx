import { ServerCalls } from "@pages/AnimeDownloadPage";
import { get } from "http";
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

/////////////// Toasts Context ///////////////

const ToastContext = createContext<ToastData[] | null>(null);
const ToastDispatchContext = createContext<React.Dispatch<ToastAction> | null>(
    null
);

export function ToastProvider({ children }: { children: JSX.Element }) {
    const [toasts, dispatch] = useReducer(toastReducer, initialToasts);

    return (
        <ToastContext.Provider value={toasts}>
            <ToastDispatchContext.Provider value={dispatch}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastContext.Provider>
    );
}

export function useToastData() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastData must be used within a ToastProvider");
    }
    return context;
}

export function useToastDispatch() {
    const context = useContext(ToastDispatchContext);
    if (!context) {
        throw new Error("useToastDispatch must be used within a ToastProvider");
    }
    return context;
}

function toastReducer(data: ToastData[], action: ToastAction) {
    switch (action.type) {
        case ToastActionType.addToast:
            return [...data, action.payload];
        case ToastActionType.removeToast:
            return data.filter(toast => toast.id !== action.payload);
        default:
            throw new Error("Unknown action type");
    }
}

export enum ToastActionType {
    addToast = "addToast",
    removeToast = "removeToast",
}

export function addToastDispatchParam(toast: ToastData) {
    return {
        type: ToastActionType.addToast,
        payload: toast,
    };
}

export function removeToastDispatchParam(id: string) {
    return {
        type: ToastActionType.removeToast,
        payload: id,
    };
}

export interface ToastAction {
    type: ToastActionType;
    payload?: any;
}

export interface ToastData {
    id: string;
    title: string;
    body: string;
    hideAfterTimestamp: number;
}

const initialToasts: ToastData[] = [];
