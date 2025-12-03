import express from "express";
import path from "path";
import { rootDir } from "./utils/path.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import indexRouter from "./routes/index.js";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Halo Community API",
      version: "1.0.0",
      description: "A simple Express Community API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(express.static(path.join(rootDir, "public")));

// 라우터 통합 사용
app.use("/", indexRouter);

app.listen(3000);

console.log("run");