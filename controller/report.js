const report = require("../model/report");

const reportController = {
    // addReport : async function(req, res)
    uploadImage : async function(req, res) {
        const uploadReportImage = (req, res) => {
            console.log(req.file);
            res.send('Upload successful!');
          };
    }
}

module.exports = reportController;