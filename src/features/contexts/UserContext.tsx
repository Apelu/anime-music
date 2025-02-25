import { MyLocalServer } from "@features/api/server";
import { get } from "http";
import { createContext, useReducer, useContext, act } from "react";

export const userStorageKey = "animeUser";
const UserContext = createContext<UserData | null>(null);
const UserDispatchContext = createContext<React.Dispatch<UserAction> | null>(
    null
);

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

function getIntialData() {
    if (localStorage.getItem(userStorageKey)) {
        var storedData = JSON.parse(
            localStorage.getItem(userStorageKey) as string
        );

        // TODO: MyLocalServer.
        return storedData;
    }

    return {
        id: "",
        isLoggedIn: false,
        username: "",
    };
}
const initialUserData = getIntialData();

/*

Caching example

// Create a context
const DataContext = React.createContext(null);

function DataProvider({ children, fetchData }) {
  const [cachedData, setCachedData] = React.useState(null);

  // Fetch and cache data if it doesn't exist
  const getData = async () => {
    if (!cachedData) {
      const data = await fetchData();
      setCachedData(data);
    }
    return cachedData;
  };

  const value = {
    data: cachedData,
    getData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function MyComponent() {
  const { data, getData } = React.useContext(DataContext);

  React.useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    </div>
);
}

function App() {
    const fetchData = async () => {
        // API call
    };
    
    return (
        <DataProvider fetchData={fetchData}>
        <MyComponent />
        </DataProvider>
    );
}

{/* Render data */
