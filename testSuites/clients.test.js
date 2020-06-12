const Client = require("../src/models/clientsDb");
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
  await Client.populateDatabase();
  done();
});
describe("Clients routes", () => {

  describe("Test getting client data by name", ()=>{

    it("Get user data, no cookie", async () => {
      const res = await request.post("/api/clients/get-by-name").send(user);
      expect(res.statusCode).toBe(401);
    });
  it("Get user data, invalid query", async () => {
    const res = await request
      .post("/api/clients/get-by-name")
      .set("Cookie", setCookie(user, "admin"));
    expect(res.statusCode).toBe(400);
  });
  it("Get user data, client does not exist", async () => {
    const res = await request
    .post("/api/clients/get-by-name")
    .set("Cookie", setCookie(user, "admin"))
      .send({ name: "Jorge" });
      expect(res.statusCode).toBe(404);
  });
  it("Get user data, client exists", async () => {
    const res = await request
    .post("/api/clients/get-by-name")
    .set("Cookie", setCookie(user, "admin"))
      .send({ name: "         manning      " });
      expect(res.statusCode).toBe(200);
  });
});


describe("Test getting client data by id", ()=>{

  it("Get user data, no cookie", async () => {
    const res = await request.post("/api/clients/get-by-id").send(user);
    expect(res.statusCode).toBe(401);
  });
it("Get user data, invalid query", async () => {
  const res = await request
    .post("/api/clients/get-by-id")
    .set("Cookie", setCookie(user, "admin"));
  expect(res.statusCode).toBe(400);
});
it("Get user data, client does not exist", async () => {
  const res = await request
  .post("/api/clients/get-by-id")
  .set("Cookie", setCookie(user, "admin"))
    .send({ id: "wrong-ID" });
    expect(res.statusCode).toBe(404);
});
it("Get user data, client exists", async () => {
  const res = await request
  .post("/api/clients/get-by-id")
  .set("Cookie", setCookie(user, "admin"))
    .send({ id: "         55601290-8619-4f54-b831-9c6c26c52b44      " });
    expect(res.statusCode).toBe(200);
});
});


})
