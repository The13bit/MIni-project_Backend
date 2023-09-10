import fs from "fs";
import os from "os";
import { catchAsyncError } from "../middleware/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import { Result } from "../Models/Result.js";
import getDataUri from "../utils/Datauri.js";
import csvtojson from "csvtojson";
import json2csv from "json2csv";
import { PythonShell } from "python-shell";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploaddataset = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }
  const fileuri = getDataUri(file);

  const decoded_file = Buffer.from(fileuri.base64, "base64").toString("utf-8");

  await csvtojson()
    .fromString(decoded_file)
    .then(async (json) => {
      for (const arr of json) {
        const duplicate = await Result.findOne({
          xie_id: arr.xie_id,
          exam_type: arr.exam_type,
          sem: arr.sem,
          year: arr.year,
        });
        if (!duplicate) {
          Result.create(arr);
        } else {
          console.log(` ${JSON.stringify(arr)} already exists`);
          continue;
        }
      }
    })
    .then(
      res.json({ success: true, message: "Collection uploaded successfully" })
    );
});

export const deletcollection = catchAsyncError(async (req, res, next) => {
  await Result.deleteMany({});
  res.json({ success: true, message: "Collection deleted successfully" });
});

export const getallresults = catchAsyncError(async (req, res, next) => {
  const results = await Result.find({});
  res.json({ success: true, results });
});

export const Resultprocess = catchAsyncError(async (req, res, next) => {
  const { xie_id, year, sem } = req.body;

  if (!xie_id || !year || !sem) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const results = await Result.find({ xie_id, year, sem });
  const fields = [
    "xie_id",
    "name",
    "branch",
    "year",
    "sem",
    "exam_type",
    "Maths_3",
    "DSA",
    "Java",
    "CG",
    "DSGT",
    "DLCOA",
  ];

  res.send(results);

  //const csv = json2csv.parse(results, { fields });
  //
  // Create a temporary file path
  //const tempFilePath = path.join(os.tmpdir(), "temp.csv");
  //
  // Write the CSV data to the temporary file
  //fs.writeFileSync(tempFilePath, csv);
  //
  //let options = {
  //    mode: "text",
  //    pythonOptions: ["-u"],
  //    scriptPath: path.join(__dirname, "../Scripts"),
  //    args: [tempFilePath],
  //};
  //
  //const data = await PythonShell.run("second_script.py", options);
  //
  // Delete the temporary file
  //fs.unlinkSync(tempFilePath);
  //
  //res.send(data);
});
