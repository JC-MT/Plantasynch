const express = require('express');
const scan = express.Router();

const { analyzeFile } = require('../Queries/scan');

scan.post('/', async (req, res) => {
    const newScan = await analyzeFile(req.body);
    
    if (newScan) {
      res.status(200).json({ success: true, payload: 'success' });
    } else {
      res
        .status(404)
        .json({ success: false, payload: 'Scan could not be completed' });
    }
  });




module.exports = scan;