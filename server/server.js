import { config } from "dotenv";
config({
  path: "./.env",
});

import { app } from "./app.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
});
