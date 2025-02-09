import fs from "fs";
import csv from "csv-parser";

export const ContactsUploader = (file) => {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        records.push({
          name: data.Name,
          email: data.Email,
          phone: data.Phone,
          gender: data.Gender,
        });
      })
      .on("end", () => resolve(records))
      .on("error", (err) => reject(err));
  });
};
