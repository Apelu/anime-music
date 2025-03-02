import MyLocalServer from "./MyLocalServer";

export enum RouteMethod {
    GET = "get",
    POST = "post",
}

export interface BodyParams {
    placeholder?: string;
}

export interface UrlParams {
    placeholder?: string;
}

export interface MyLocalServerCallResponse {
    placeholder?: string;
}

class MyLocalServerCall {
    baseRoute: string = "";
    url: string = "";
    method: string = "";

    constructor(baseRoute: string = "/", url: string, method: string) {
        this.baseRoute = baseRoute;
        this.url = url;
        this.method = method;
    }

    getUrl(urlParams: UrlParams) {
        if (!this.url) {
            throw new Error("No URL provided");
        }

        const parts = this.url.split("/");
        return parts
            .map(part => {
                if (part[0] === ":") {
                    const paramName = part.slice(1);
                    if (Object.keys(urlParams).includes(paramName)) {
                        const paramValue = (urlParams as any)[paramName];

                        if (!paramValue) {
                            throw new Error(`Missing URL parameter: ${part}`);
                        }
                        return paramValue;
                    }
                }
                return part;
            })
            .join("/");
    }

    async fetch(bodyParams: BodyParams, urlParams?: UrlParams) {
        if (!this.url) {
            throw new Error("No URL provided");
        }

        if (!this.method) {
            throw new Error("No method provided");
        }

        const url = urlParams ? this.getUrl(urlParams) : this.url;
        console.log(
            "Fetching:",
            MyLocalServer.serverURL + this.baseRoute + url
        );
        return fetch(MyLocalServer.serverURL + this.baseRoute + url, {
            method: this.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...bodyParams,
            }),
        });
    }
}

export default MyLocalServerCall;
