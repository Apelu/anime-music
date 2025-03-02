import MyLocalServerCall, {
    BodyParams,
    MyLocalServerCallResponse,
    RouteMethod,
    UrlParams,
} from "../MyLocalServerCall";
import PullLocalUserAnimeContainers, {
    NewUserContainer,
    UserContainer,
} from "./PullLocalUserAnimeContainers";

export interface CreateNewLocalUserAnimeContainerBodyParams extends BodyParams {
    userID: string;
    newContainer: NewUserContainer;
}

export interface CreateNewLocalUserAnimeContainerUrlParams extends UrlParams {}

export interface CreateNewLocalUserAnimeContainerResponse
    extends MyLocalServerCallResponse {
    newContainer: UserContainer;
}

class CreateNewLocalUserAnimeContainer extends MyLocalServerCall {
    static method = RouteMethod.POST;
    static baseRoute = PullLocalUserAnimeContainers.baseRoute;
    static url = "/create";

    constructor() {
        super(
            CreateNewLocalUserAnimeContainer.baseRoute,
            CreateNewLocalUserAnimeContainer.url,
            CreateNewLocalUserAnimeContainer.method
        );
    }

    fetch(
        methodParams: CreateNewLocalUserAnimeContainerBodyParams,
        urlParams?: CreateNewLocalUserAnimeContainerUrlParams
    ) {
        return super.fetch(methodParams, urlParams);
    }
}

export default CreateNewLocalUserAnimeContainer;
