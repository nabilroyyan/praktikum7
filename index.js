const express = require("express");
const app = express();
const port = 3000;

const bodyps = require("body-parser");
app.use(bodyps.urlencoded({ extended: false }));
app.use(bodyps.json());

// Import router-routes yang telah Anda buat
const ktpRouter = require("./routes/ktp");
app.use("/api/ktp", ktpRouter);
const kartuKeluargaRouter = require("./routes/kartukeluarga");
app.use("/api/kartu-keluarga", kartuKeluargaRouter);
const detailKkRouter = require("./routes/detailkk");
app.use("/api/detail-kk", detailKkRouter);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http://localhost:${port}`);
});
