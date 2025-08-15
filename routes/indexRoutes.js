const express = require("express");
const { homepage, healthCheck, metrics, promtailMetrics } = require("../controllers/indexController");
const router = express.Router();


// Get /
router.get("/", homepage)

// Health check endpoint
router.get("/health", healthCheck)

// Metrics endpoints for monitoring
router.get("/metrics", metrics)
router.get("/metrics/promtail", promtailMetrics)


module.exports = router;
