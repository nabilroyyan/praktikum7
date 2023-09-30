const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from ktp order by nik desc", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data ktp",
        data: rows,
      });
    }
  });
});

router.post(
  "/create",
  [
    body("nik").notEmpty(),
    body("nama_lengkap").notEmpty(),
    body("jenis_kelamin").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("pendidikan").notEmpty(),
    body("jenis_pekerjaan").notEmpty(),
    body("golongan_darah").notEmpty(),
    body("kewarganegaraan").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const data = {
      nik: req.body.nik,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan,
    };

    connection.query("INSERT INTO KTP SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
          error: err,
        });
      }
      return res.status(201).json({
        status: true,
        message: "KTP has been created!",
        data: result,
      });
    });
  }
);

router.patch(
  "/:nik",
  [
    body("nik").notEmpty(),
    body("nama_lengkap").notEmpty(),
    body("jenis_kelamin").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("pendidikan").notEmpty(),
    body("jenis_pekerjaan").notEmpty(),
    body("golongan_darah").notEmpty(),
    body("kewarganegaraan").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const nik = req.params.nik;
    const data = {
      nik: req.body.nik,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan,
    };

    connection.query(
      "UPDATE KTP SET ? WHERE nik = ?",
      [data, nik],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ status: false, message: "Server Error", error: err });
        }
        return res.status(200).json({
          status: true,
          message: "KTP has been updated!",
          data: result,
        });
      }
    );
  }
);

router.delete("/:nik", (req, res) => {
  const nik = req.params.nik;

  connection.query("DELETE FROM KTP WHERE nik = ?", nik, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Server Error" });
    }
    return res
      .status(200)
      .json({ status: true, message: "KTP has been deleted!", data: result });
  });
});

module.exports = router;
