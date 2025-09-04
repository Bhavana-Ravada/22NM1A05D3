import express from "express";
import ShortUrl from "../models/shorturl.js";
import { Log } from "../../LoggingMiddleware/logger.js";

const router = express.Router();

/**
 * @route   POST /shorturls
 * @desc    Create a short URL
 * @body    { "url": "https://example.com", "validity": 10 }
 */
router.post("/", async (req, res) => {
  try {
    const { url, validity } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const shortcode = Math.random().toString(36).substring(2, 8); // 6-char code
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + (validity || 5)); // default 5 mins

    const shortUrl = new ShortUrl({
      originalURL: url,
      shortcode,
      expiry,
      clicks: 0,
      details: [],
    });

    await shortUrl.save();
    await Log("backend", "info", "shorturl", `Created shortcode ${shortcode}`);

    res.status(201).json(shortUrl);
  } catch (err) {
    console.error(err);
    await Log("backend", "error", "shorturl", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /shorturls/stats/:shortcode
 * @desc    Get stats of a short URL
 */
router.get("/stats/:shortcode", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      shortcode: req.params.shortcode,
    });

    if (!shortUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.json(shortUrl);
  } catch (err) {
    console.error(err);
    await Log("backend", "error", "stats", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /:shortcode
 * @desc    Redirect to original URL
 */
router.get("/:shortcode", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      shortcode: req.params.shortcode,
    });

    if (!shortUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // check expiry
    if (new Date() > shortUrl.expiry) {
      return res.status(410).json({ message: "Short URL expired" });
    }

    // log the click details
    shortUrl.clicks++;
    shortUrl.details.push({
      timestamp: new Date(),
      referrer: req.get("Referer") || "direct",
      ip: req.ip,
    });

    await shortUrl.save();
    await Log(
      "backend",
      "info",
      "redirect",
      `Redirected ${req.params.shortcode}`
    );

    // redirect to original URL
    res.redirect(shortUrl.originalURL);
  } catch (err) {
    console.error(err);
    await Log("backend", "error", "redirect", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
