import express from "express";
import bodyPaser from "body-parser";
import cors from "cors";
import * as addressController from "./controllers/addressController";

const app = express();
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cors());

const SERVER_PORT = 3006;

app.post("/", addressController.addressSign);

app.listen(SERVER_PORT, () =>
  console.log(`server running at port ${SERVER_PORT}`)
);