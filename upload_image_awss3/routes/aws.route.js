const express = require('express');
const { BookRequestPayload } = require('../request/book.request');
const BookService = require('../services/book.service');
const brandLogoService = require('../services/brandLogo.service');

const router = express.Router();

router.post('/add', async (req, res) => {
    const requestPayload = req.body;
    try {
      const presignedUrl = await brandLogoService.addBrandLogo(fileData, uuid, file_name);
      res.status(200).json({ message: 'File is uploaded.', presignedUrl });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
    // await BrandLogoService.brandLogoBook(requestPayload);
    // res.json({ message: 'success' });
  });