import { Route } from "react-router-dom";
import MyLocalServerCall, {
    BodyParams,
    MyLocalServerCallResponse,
    RouteMethod,
    UrlParams,
} from "../MyLocalServerCall";

export interface PullLocalUserAnimeContainersBodyParams extends BodyParams {
    userID: string;
}

export interface PullLocalUserAnimeContainersUrlParams extends UrlParams {}

export interface NewUserContainer {
    userID: string;
    name: string;
    expanded: boolean;

    sortBy: string;
    sortDirection: string; // "asc" or "desc"
    filters: any;
    viewType: string;
}
export interface UserContainer extends NewUserContainer {
    id: string;
}

export interface PullLocalUserAnimeContainersResponse
    extends MyLocalServerCallResponse {
    userContainers: UserContainer[];
}

class PullLocalUserAnimeContainers extends MyLocalServerCall {
    static method = RouteMethod.POST;
    static baseRoute = "/container";
    static url = "/anime-lists";

    constructor() {
        super(
            PullLocalUserAnimeContainers.baseRoute,
            PullLocalUserAnimeContainers.url,
            PullLocalUserAnimeContainers.method
        );
    }

    fetch(
        methodParams: PullLocalUserAnimeContainersBodyParams,
        urlParams?: PullLocalUserAnimeContainersUrlParams
    ) {
        return super.fetch(methodParams, urlParams);
    }
}

export default PullLocalUserAnimeContainers;
