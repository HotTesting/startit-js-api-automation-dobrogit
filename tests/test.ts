import * as request from "request-promise-native";
import * as faker from "faker";
import { expect } from "chai";

describe("Users", function() {
    it("Login as admin should be successful", async function() {
        const adminLoginResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/login",
            {
                json: true,
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        console.log("Login successful!", adminLoginResp);
        expect(adminLoginResp, adminLoginResp)
            .to.be.an("object")
            .that.has.all.keys("token", "tokenExpires", "id");
        expect(typeof adminLoginResp.token, adminLoginResp).to.equal("string");
        expect(typeof adminLoginResp.tokenExpires, adminLoginResp).to.equal("string");
        expect(typeof adminLoginResp.id, adminLoginResp).to.equal("string");
    });

    it.only("Existing user info", async function() {
        const adminLoginResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/login",
            {
                json: true,
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );

        const userInfoResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/${adminLoginResp.id}",
            {
                json: true,
                headers: {
                    "Authorization": "Bearer" + adminLoginResp.token 
                }
            }
        );

        console.log(userInfoResp)
    });

    it("Unexisting user info", async function() {
        
    });

    it("Existing user info with invalid token", async function() {
        
    });

    it("Existing user info without token", async function() {
        
    });

    it("User list", async function() {
        
    });

    it("User list with invalid token", async function() {
        
    });

    it("User list info without token", async function() {
        
    });

    it("User logged in", async function() {
        
    });

    it("User logged in without token", async function() {
        
    });

    it("Delete existing user", async function() {
        
    });

    it("Delete unexisting user", async function() {
        
    });

    it("Delete User in without token", async function() {
        
    });

    it("Delete User with invalid token", async function() {
        
    });
});
