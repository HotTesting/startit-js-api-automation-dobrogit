import * as requestPromise  from "request-promise-native";
import * as faker from "faker";
import { expect } from "chai"

let request = requestPromise.defaults({
    json: true
})

describe("Users", function() {
    it("Login as admin should be successful", async function() {
        let adminLoginResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/login",
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        expect(adminLoginResp, adminLoginResp)
            .to.be.an("object")
            .that.has.all.keys("token", "tokenExpires", "id");
        expect(typeof adminLoginResp.token, adminLoginResp).to.equal("string");
        expect(typeof adminLoginResp.tokenExpires, adminLoginResp).to.equal("string");
        expect(typeof adminLoginResp.id, adminLoginResp).to.equal("string");
    });

    it("receiving information about existing user by id should be successful", async function() {
        let adminLoginResp = await request.post(
            'http://ip-5236.sunline.net.ua:30020/users/login',
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/${adminLoginResp.id}`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }
            }
        );
        expect(userInfoResp, userInfoResp)
        .to.be.an('object')
        .that.has.keys('_id','authenticationMethod','createdAt',
         'username', 'emails', 'isAdmin', 'profile', 'services');
    });

    it("receiving information about not existing user should return undefined", async function() {
        let adminLoginResp = await request.post(
            'http://ip-5236.sunline.net.ua:30020/users/login',
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/asdffasf`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }
            }
        );
        expect(userInfoResp, userInfoResp)
        .to.be.equal(undefined);
    });

    it("Request user by id with invalid token should return error", async function() {
        let fakeToken = faker.random.alphaNumeric(12);
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/asdffasf`,
            {
                auth: {
                    bearer: fakeToken 
                }
            }
        );
        expect(userInfoResp, userInfoResp)
        .to.be.an('object');
        expect(userInfoResp.error, userInfoResp.error).to.equal('Unauthorized');
        expect(userInfoResp.statusCode, userInfoResp.statusCode).to.equal(401)
    });

    it("Request user by id without token should return error", async function() {
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/asdffasf`);
        expect(userInfoResp, userInfoResp)
        .to.be.an('object');
        expect(userInfoResp.error, userInfoResp.error).to.equal('Unauthorized');
        expect(userInfoResp.statusCode, userInfoResp.statusCode).to.equal(401)
    });

    it("receiving users list should be successful", async function() {
        let adminLoginResp = await request.post(
            'http://ip-5236.sunline.net.ua:30020/users/login',
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        let usersInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }
            }
        );
        expect(usersInfoResp, usersInfoResp)
        .to.be.an('array');
        expect(usersInfoResp[0], usersInfoResp[0])
        .that.has.keys('_id','username');
    });

    it("Request users list with invalid token should return error", async function() {
        let fakeToken = faker.random.alphaNumeric(12);
        let usersInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users`,
            {
                auth: {
                    bearer: fakeToken
                }
            }
        );
        expect(usersInfoResp, usersInfoResp)
        .to.be.an('object');
        expect(usersInfoResp.error, usersInfoResp.error).to.equal('Unauthorized');
        expect(usersInfoResp.statusCode, usersInfoResp.statusCode).to.equal(401)
    });

    it("Request users list without token should return error", async function() {
        let usersInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users`);
        expect(usersInfoResp, usersInfoResp)
        .to.be.an('object');
        expect(usersInfoResp.error, usersInfoResp.error).to.equal('Unauthorized');
        expect(usersInfoResp.statusCode, usersInfoResp.statusCode).to.equal(401)
    });

    it("User logged in", async function() {
        let adminLoginResp = await request.post(
            'http://ip-5236.sunline.net.ua:30020/users/login',
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/user`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }
            }
        );
        expect(userInfoResp, userInfoResp)
        .to.be.an('object')
        .that.has.keys('_id','authenticationMethod','createdAt',
        'username', 'emails', 'isAdmin', 'profile');
         expect(userInfoResp._id, userInfoResp._id).to.be.equal(adminLoginResp.id)
    });

    it("Request user with invalid token should return error", async function() {
        let fakeToken = faker.random.alphaNumeric(12);
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/user`,
            {
                auth: {
                    bearer: fakeToken 
                }
            }
        );
        expect(userInfoResp, userInfoResp)
        .to.be.an('object');
        expect(userInfoResp.error, userInfoResp.error).to.equal('Unauthorized');
        expect(userInfoResp.statusCode, userInfoResp.statusCode).to.equal(401)
    });

    it("Request user without token should return error", async function() {
        let userInfoResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/user`);
        expect(userInfoResp, userInfoResp)
        .to.be.an('object');
        expect(userInfoResp.error, userInfoResp.error).to.equal('Unauthorized');
        expect(userInfoResp.statusCode, userInfoResp.statusCode).to.equal(401)
    });

    it("Delete existing user should be successful", async function() {
        let adminLoginResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/login",
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        const email = faker.internet.email(
            undefined,
            undefined,
            "ip-5236.sunline.net.ua"
            );
        let createUserResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/api/users",
            {
                auth: {
                    bearer: adminLoginResp.token 
                },
                body:{
                    username: faker.internet.userName(),
                    email: email,
                    password: email
                }
            }
        );
        let deleteUserResp = await request.delete(
                `http://ip-5236.sunline.net.ua:30020/api/users/${createUserResp._id}`,
                {
                    auth: {
                        bearer: adminLoginResp.token 
                    }  
                }
        );
        expect(deleteUserResp, deleteUserResp).to.be.an('object');
        expect(deleteUserResp._id, deleteUserResp._id).to.equal(createUserResp._id)
    });

    it("Delete not existing user should return error", async function() {
        let adminLoginResp = await request.post(
            "http://ip-5236.sunline.net.ua:30020/users/login",
            {
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            }
        );
        let userId = faker.random.alphaNumeric(7)
        let deleteUserResp = await request.delete(
            `http://ip-5236.sunline.net.ua:30020/api/users/${userId}`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }  
            }
        );
        // check if deleted
        let findDeletedUserResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/${userId}`,
            {
                auth: {
                    bearer: adminLoginResp.token 
                }  
            }
        );
        expect(findDeletedUserResp, findDeletedUserResp).to.be.equal(undefined)
    });

    it("Delete User without token should return error", async function() {
        let userId = faker.random.alphaNumeric(7);
        let findDeletedUserResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/${userId}`
        );
        expect(findDeletedUserResp.error, findDeletedUserResp.error).to.equal('Unauthorized');
        expect(findDeletedUserResp.statusCode, findDeletedUserResp.statusCode).to.equal(401)
    });

    it("Delete User with invalid token should return error", async function() {
        let userId = faker.random.alphaNumeric(7);
        let fakeToken = faker.random.alphaNumeric(12)
        let findDeletedUserResp = await request.get(
            `http://ip-5236.sunline.net.ua:30020/api/users/${userId}`,
            {
                auth: {
                    bearer: fakeToken
                }  
            }
        );
        expect(findDeletedUserResp.error, findDeletedUserResp.error).to.equal('Unauthorized');
        expect(findDeletedUserResp.statusCode, findDeletedUserResp.statusCode).to.equal(401)
    });
});
