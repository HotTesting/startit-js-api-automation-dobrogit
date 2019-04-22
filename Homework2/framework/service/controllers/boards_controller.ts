import { Request } from "../../request";
import { Controller } from "./controller";
import {Board} from "../models/Board"
import { CookieJar } from "request";

export class Boards extends Controller {
    bearerToken: string;

    constructor(BASE_URL?: string, cookieJar?, bearerToken?: string) {
        super(BASE_URL, cookieJar);
        this.bearerToken = bearerToken;
    }

    async createBoard(
        title: string,
        owner: string,
        permission: string,
        color: string
    ): Promise<Board> {
        let resp = await new Request(
            this.BASE_URL + "/api/boards"
        )
            .auth(this.bearerToken)
            .method("POST")
            .body({
                title: title,
                owner: owner,
                permission: permission,
                color: color
            })
            .send();

        return resp.body;
    }
}
