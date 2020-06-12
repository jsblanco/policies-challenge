const permissions = require("../src/middleware/permissions");

const testRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User permissions testing", () => {
  let res, next;
  beforeEach(() => {
    res = testRes();
    next = jest.fn();
  });

  describe("User role verification test", () => {
    it('Test wrong user role on middleware checking for "admin" or "users" role', async () => {
      const req = { body: { token: { role: "anyrole" } } };
      await permissions.usersAndAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Test wrong user role on middleware checking for "admin" role', async () => {
      const req = { body: { token: { role: "anyrole" } } };
      await permissions.adminOnly(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Test "users" user role on middleware checking for "admin" and "users" roles', async () => {
      const req = { body: { token: { role: "users" } } };
      await permissions.usersAndAdmin(req, res, next);
      expect(next).toBeCalled();
    });
    it('Test "users" user role on middleware checking for "admin" role', async () => {
      const req = { body: { token: { role: "users" } } };
      await permissions.adminOnly(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Test "admin" user role on middleware checking for "admin" and "users" roles', async () => {
      const req = { body: { token: { role: "admin" } } };
      await permissions.usersAndAdmin(req, res, next);
      expect(next).toBeCalled();
    });
    it('Test "admin" user role on middleware checking for "admin" role', async () => {
      const req = { body: { token: { role: "admin" } } };
      await permissions.adminOnly(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
