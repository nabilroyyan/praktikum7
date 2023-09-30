const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Get all DetailKK
router.get("/", function (req, res) {
  connection.query(
    "select nama_lengkap,ayah,ibu, no_kk, status_hubungan from detail_kk inner join ktp on detail_kk.nik = ktp.nik order by id_detail desc",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Failed",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "detail kakak",
          data: rows,
        });
      }
    }
  );
});

// Create DetailKK
router.post(
  "/create",
  [
    body("no_kk").notEmpty(),
    body("nik").notEmpty(),
    body("status_hubungan").notEmpty(),
    body("ayah").notEmpty(),
    body("ibu").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error,
      });
    }
    let data = {
      no_kk: req.body.no_kk,
      nik: req.body.nik,
      status_hubungan: req.body.status_hubungan,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    };
    connection.query("insert into detail_kk set ?", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data detail kk berhasil ditambah",
          data: rows[0],
        });
      }
    });
  }
);

// Update DetailKK
router.patch(
  "/:id_detail",
  [
    body("no_kk").notEmpty(),
    body("nik").notEmpty(),
    body("status_hubungan").notEmpty(),
    body("ayah").notEmpty(),
    body("ibu").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const id_detail = req.params.id_detail;
    const data = {
      no_kk: req.body.no_kk,
      nik: req.body.nik,
      status_hubungan: req.body.status_hubungan,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    };

    connection.query(
      "UPDATE detail_KK SET ? WHERE id_detail = ?",
      [data, id_detail],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ status: false, message: "Server Error", error: err });
        }
        return res.status(200).json({
          status: true,
          message: "Detail_KK has been updated!",
          data: result,
        });
      }
    );
  }
);

router.delete("/:id_detail", (req, res) => {
  const id_detail = req.params.id_detail;

  connection.query(
    "DELETE FROM detail_kk WHERE id_detail = ?",
    id_detail,
    (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, message: "Server Error" });
      }
      return res
        .status(200)
        .json({
          status: true,
          message: "detail has been deleted!",
          data: result,
        });
    }
  );
});

module.exports = router;
