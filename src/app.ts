import express from "express";
import reservationRoutes from "./routes/reservation.routes";
import clientRoutes from "./routes/client.routes";
import themeRoutes from "./routes/theme.routes";
import salleRoutes from "./routes/salle.routes";
import sessionRoutes from "./routes/session.routes";
import paiementRoutes from "./routes/paiement.routes";
import avisRoutes from "./routes/avis.routes";
import tarificationRoutes from "./routes/tarification.routes";
import promotionRoutes from "./routes/promotion.routes";

const app = express();

app.use(express.json());

app.use("/reservations", reservationRoutes);
app.use("/clients", clientRoutes);
app.use("/themes", themeRoutes);
app.use("/salles", salleRoutes);
app.use("/sessions", sessionRoutes);
app.use("/paiements", paiementRoutes);
app.use("/avis", avisRoutes);
app.use("/tarifications", tarificationRoutes);
app.use("/promotions", promotionRoutes);

export default app;
