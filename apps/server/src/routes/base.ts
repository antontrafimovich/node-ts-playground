import express from "express";

const router = express.Router();

const useBaseRoutes = (app: express.Express) => {
  router.get("/", (req, res) => {
    res.send("respond with a resource");
  });

  app.use(router);
};

export { useBaseRoutes };
