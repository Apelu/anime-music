import { createContext, useReducer } from "react";

export const SubBarSettingsContext = createContext<SubBarSettings | null>(null);
export const SubBarSettingsDispatchContext =
    createContext<React.Dispatch<SubBarSettingsAction> | null>(null);

export function SubBarSettingsProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const [subBarSettings, dispatch] = useReducer(
        subBarSettingsReducer,
        initialSubBarSettings
    );

    return (
        <SubBarSettingsContext.Provider value={subBarSettings}>
            <SubBarSettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SubBarSettingsDispatchContext.Provider>
        </SubBarSettingsContext.Provider>
    );
}

function subBarSettingsReducer(
    subBarSettings: SubBarSettings,
    action: SubBarSettingsAction
) {
    switch (action.type) {
        case SubBarActionType.Open:
            return { ...subBarSettings, isOpen: true };
        case SubBarActionType.Close:
            return { ...subBarSettings, isOpen: false };
        case SubBarActionType.Toggle:
            return { ...subBarSettings, isOpen: !subBarSettings.isOpen };
        case SubBarActionType.Update:
            return {
                ...subBarSettings,
                isOpen: action.isOpen ? true : false,
                render: action.render,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export enum SubBarActionType {
    Open = "Open",
    Close = "Close",
    Toggle = "Toggle",
    Update = "Update",
}

interface SubBarSettingsAction {
    type:
        | SubBarActionType.Open
        | SubBarActionType.Close
        | SubBarActionType.Toggle
        | SubBarActionType.Update;
    render?: JSX.Element;
    isOpen?: boolean;
}

interface SubBarSettings {
    isOpen: boolean;
    mainRender?: JSX.Element;
}

const initialSubBarSettings = {
    isOpen: false,
    render: undefined,
};
