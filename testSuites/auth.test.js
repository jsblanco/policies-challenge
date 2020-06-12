const app = require("../src/app");
const { authUser, badUserData } = require("./testUsers");
const supertest = require("supertest");
const request = supertest(app);

describe("Authentification routes test", () => {
  let cookie;

  describe("Testing user signup", () => {
    it("Signup with wrong information", async () => {
      const response = await request.post("/api/signup").send(badUserData);
      expect(response.statusCode).toBe(400);
    });
    it("Signup with correct information", async () => {
      const response = await request.post("/api/signup").send(authUser);
      cookie = response.header["set-cookie"];
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Testing user login", () => {
    it("Test user login with non existant user", async () => {
      const res = await request
        .post("/api/auth")
        .send({ email: "fake@email.com", password: "123456" });
      expect(res.statusCode).toBe(400);
    });
    it("Test user login with missing data", async () => {
      const res = await request
        .post("/api/auth")
        .send({ email: "test@email.com" });
      expect(res.statusCode).toBe(400);
    });
    it("Test user login successfully", async () => {
      const res = await request
        .post("/api/auth")
        .send({ password: "12345678", email: "test@test.com" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing user edit route", () => {
    it("User edit with wrong information", async () => {
      const res = await request
        .put("/api/auth")
        .set("Cookie", cookie)
        .send({ ...authUser, originalPassword: "originalPassword" });
      expect(res.statusCode).toBe(400);
    });
    it("User edit with right information", async () => {
      const res = await request
        .put("/api/auth")
        .set("Cookie", cookie)
        .send({ ...authUser, username: "NewUsername" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing user deletion route", () => {
    it("Delete route without user cookie", async () => {
      const res = await request.delete("/api/auth").send(authUser);
      expect(res.statusCode).toBe(401);
    });
    it("Delete route sending wrong information", async () => {
      const res = await request
        .delete("/api/auth")
        .set("Cookie", cookie)
        .send(authUser.email);
      expect(res.statusCode).toBe(400);
    });
    it("Delete user success", async () => {
      const res = await request
        .delete("/api/auth")
        .set("Cookie", cookie)
        .send(authUser);
      expect(res.statusCode).toBe(200);
    });
  });
});
