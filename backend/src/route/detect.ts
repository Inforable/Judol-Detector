const express = require("express");
const router = express.Router();
const { getComment } = require("../service/youtubeService");
const { detectJudolComment } = require("../algorithm/detectAlgorithm");
const { normalizeUnicode } = require("../algorithm/normalizer");

import type { Request, Response } from "express";

router.post("/", async (req: Request, res: Response) => {
    const { videoUrl, algorithm, pattern } = req.body;

    // Ekstrak videoID dari URL/ID
    let videoId = videoUrl;

    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        videoId = match ? match[1] : videoUrl;
    }

    // Ambil komentar dari YouTube
    let comment: string[] = [];
    try {
        comment = await getComment(videoId);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch comments from YouTube" });
    }

    const normalizedComments = comment.map(normalizeUnicode);
    
    const result = detectJudolComment(normalizedComments, algorithm, pattern);
    if (!result) {
        return res.status(404).json({ message: "No comments detected" });
    }

    res.json({
        videoId,
        algorithm,
        pattern,
        result,
        sampleComments: normalizedComments.slice(0, 5),
    })
});

module.exports = router;