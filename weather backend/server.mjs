import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const api = process.env.OpenWeather_API;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/geo", async (req, res) => {
  const { city } = req.query;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api}`
  );
  const data = await response.json();
  res.json(data);
});

app.get("/api/weather", async (req, res) => {
  const { lat, lon, units = "imperial" } = req.query;
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${api}`
  );
  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => console.log("Server is running on port 5000"));
