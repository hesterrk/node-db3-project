const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong"
    });
  });
  
  server.use((req, res) => {
    res.status(404).json({
      message: "Your request is not found"
    });
  });

module.exports = server;