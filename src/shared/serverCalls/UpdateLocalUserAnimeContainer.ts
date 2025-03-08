import MyLocalServerCall, {
    BodyParams,
    MyLocalServerCallResponse,
    RouteMethod,
    UrlParams,
} from "@shared/MyLocalServerCall";
import PullLocalUserAnimeContainers, {
    UserContainer,
} from "./PullLocalUserAnimeContainers";

export interface UpdateLocalUserAnimeContainerBodyParams extends BodyParams {
    userID: string;
    updatedContainer: UserContainer;
}

export interface UpdateLocalUserAnimeContainerUrlParams extends UrlParams {}

export interface UpdateLocalUserAnimeContainerResponse
    extends MyLocalServerCallResponse {
    updatedContainer: UserContainer;
}

class UpdateLocalUserAnimeContainer extends MyLocalServerCall {
    static method = RouteMethod.POST;
    static baseRoute = PullLocalUserAnimeContainers.baseRoute;
    static url = "/update";

    constructor() {
        super(
            UpdateLocalUserAnimeContainer.baseRoute,
            UpdateLocalUserAnimeContainer.url,
            UpdateLocalUserAnimeContainer.method
        );
    }

    fetch(
        methodParams: UpdateLocalUserAnimeContainerBodyParams,
        urlParams?: UpdateLocalUserAnimeContainerUrlParams
    ) {
        return super.fetch(methodParams, urlParams);
    }
}

export default UpdateLocalUserAnimeContainer;
