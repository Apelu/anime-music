import { FilterTemplate, SortDirection, ViewType } from "../../shared/constant";
import MyLocalServerCall, {
    BodyParams,
    MyLocalServerCallResponse,
    RouteMethod,
    UrlParams,
} from "../MyLocalServerCall";

export interface PullLocalUserAnimeContainerBodyParams extends BodyParams {
    userID: string;
    containerID: string;
}

export interface PullLocalUserAnimeContainerUrlParams extends UrlParams {}

export interface NewUserContainer {
    userID: string;
    name: string;
    expanded: boolean;

    sortBy: string;
    sortOrder: string; // "asc" or "desc"
    filters: any;
}
export interface UserContainer extends NewUserContainer {
    id: string;
}

export interface PullLocalUserAnimeContainerResponse
    extends MyLocalServerCallResponse {
    name: string;

    // subBarIsOpen?: boolean;

    // showingFilters?: boolean;
    filters: FilterTemplate[];

    // isSearching?: boolean;
    searchText?: string;

    sortBy: string;
    // sortByOptions?: string[];
    sortDirection: SortDirection;

    viewType: ViewType;

    expanded: boolean;
    items: any;
}

class PullLocalUserAnimeContainer extends MyLocalServerCall {
    static method = RouteMethod.POST;
    static baseRoute = "/container";
    static url = "/anime-container";

    constructor() {
        super(
            PullLocalUserAnimeContainer.baseRoute,
            PullLocalUserAnimeContainer.url,
            PullLocalUserAnimeContainer.method
        );
    }

    fetch(
        methodParams: PullLocalUserAnimeContainerBodyParams,
        urlParams?: PullLocalUserAnimeContainerUrlParams
    ) {
        return super.fetch(methodParams, urlParams);
    }
}

export default PullLocalUserAnimeContainer;
