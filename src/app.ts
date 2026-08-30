import express from "express";
import reservationRoutes from "./routes/reservation.routes";

const app = express();

app.use(express.json());

app.use("/reservations", reservationRoutes);

export default app;
