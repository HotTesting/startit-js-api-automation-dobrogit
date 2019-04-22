import * as faker from "faker";
import { Boards } from "../framework/service/controllers/boards_controller"
import { expect } from "chai";

describe("Boards", function(){
    it("create board should be successful", async function(){
        const title = faker.internet.userName()
        const resp = await new Boards(undefined, undefined,"cYVXYx_XIV1o7ozyXCTKn8snwi2Z5tTO_BZ98jWEv15")
            .createBoard(title, title, "private", "nephritis")
        console.log(resp)
    })
})