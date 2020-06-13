const Policies = require("../src/models/policiesDb");
const Clients = require("../src/models/clientsDb");
const app = require("../src/app");
const { user } = require("./testUsers");
const supertest = require("supertest");
const request = supertest(app);
const signToken = require("./../src/helpers/signToken.js");

const setCookie = (user, role) => {
  const websiteName = "App-" + process.env.APPNAME;
  const payload = { ...user, role };
  return `${websiteName}=${signToken(payload)}`;
};

beforeAll(async (done) => {
  await Policies.populateDatabase();
  done();
});

describe("Testing policies routes", () => {
  describe("Testing get policy's client data route", () => {
    it("Get policies, no user cookie", async () => {
      const res = await request
        .post("/api/policies/get-by-name")
        .send({ name: "         MaNNinG " });
      expect(res.statusCode).toBe(401);
    });

    it("Get policies, invalid query", async () => {
      const res = await request
        .post("/api/policies/get-by-name")
        .set("Cookie", setCookie(user, "admin"));
      expect(res.statusCode).toBe(400);
    });
    it("Get policies, client does not exist", async () => {
      const res = await request
        .post("/api/policies/get-by-name")
        .set("Cookie", setCookie(user, "admin"))
        .send({ name: "         jorge " });
      expect(res.statusCode).toBe(404);
    });

    it("Get policies, client exists", async () => {
      const res = await request
        .post("/api/policies/get-by-name")
        .set("Cookie", setCookie(user, "admin"))
        .send({ name: "         MaNNinG " });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing get policies for a specific client route", () => {
    describe("Testing get policy's client data route", () => {
      it("Get client data, no user cookie", async () => {
        const res = await request
          .post("/api/policies/get-client-info")
          .send({ id: "         56b415d6-53ee-4481-994f-4bffa47b5239 " });
        expect(res.statusCode).toBe(401);
      });

      it("Get client data, invalid query", async () => {
        const res = await request
          .post("/api/policies/get-client-info")
          .set("Cookie", setCookie(user, "admin"));
        expect(res.statusCode).toBe(400);
      });
      it("Get client data, policy does not exist", async () => {
        const res = await request
          .post("/api/policies/get-client-info")
          .set("Cookie", setCookie(user, "admin"))
          .send({ id: "      invalid-id " });
        expect(res.statusCode).toBe(404);
      });

      it("Get client data, policy exists", async () => {
        const res = await request
          .post("/api/policies/get-client-info")
          .set("Cookie", setCookie(user, "admin"))
          .send({ id: "         56b415d6-53ee-4481-994f-4bffa47b5239 " });
        expect(res.statusCode).toBe(200);
      });
    });
  });
});
