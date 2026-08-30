import express from "express";
import reservationRoutes from "./routes/reservation.routes";
import clientRoutes from "./routes/client.routes";
import themeRoutes from "./routes/theme.routes";

const app = express();

app.use(express.json());

app.use("/reservations", reservationRoutes);
app.use("/clients", clientRoutes);
app.use("/themes", themeRoutes);

export default app;
