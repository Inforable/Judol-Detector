const express = require("express");
const router = express.Router();
const { getAuthUrl, getTokens } = require("../service/youtubeAuth");
const { insertComments, deleteJudolComments } = require("../service/commentsService");

import type { Request, Response } from "express";

// Get auth URL
router.get("/auth", (req: Request, res: Response) => {
    try {
        const authUrl = getAuthUrl();
        res.json({ authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({ error: "Failed to generate auth URL" });
    }
});

// Exchange code for token
router.post("/auth/callback", async (req: Request, res: Response) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: "Authorization code is required" });
    }

    try {
        const tokens = await getTokens(code);
        res.json({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expiry_date
        });
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).json({ error: "Failed to get tokens" });
    }
});

// Insert comments
router.post("/insert", async (req: Request, res: Response) => {
    const { videoId, comments, accessToken } = req.body;

    if (!videoId || !comments || !accessToken) {
        return res.status(400).json({ 
            error: "videoId, comments, and accessToken are required" 
        });
    }

    // Extract video ID from URL
    let extractedVideoId = videoId;
    if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
        const match = videoId.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        extractedVideoId = match ? match[1] : videoId;
    }

    try {
        const results = await insertComments(extractedVideoId, comments, accessToken);
        const successCount = results.filter((r: { success: any; }) => r.success).length;
        const failCount = results.filter((r: { success: any; }) => !r.success).length;

        res.json({
            success: true,
            inserted: successCount,
            failed: failCount,
            results
        });
    } catch (error) {
        console.error('Error inserting comments:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : "Insert failed" 
        });
    }
});

// Delete judol comments
router.post("/delete", async (req: Request, res: Response) => {
    const { videoId, accessToken } = req.body;

    if (!videoId || !accessToken) {
        return res.status(400).json({ 
            error: "videoId and accessToken are required" 
        });
    }

    // Extract video ID from URL
    let extractedVideoId = videoId;
    if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
        const match = videoId.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        extractedVideoId = match ? match[1] : videoId;
    }

    try {
        const deletedComments = await deleteJudolComments(extractedVideoId, accessToken);
        const successCount = deletedComments.filter((c: { success: any; }) => c.success).length;
        const failCount = deletedComments.filter((c: { success: any; }) => !c.success).length;

        res.json({
            success: true,
            deleted: successCount,
            failed: failCount,
            deletedComments
        });
    } catch (error) {
        console.error('Error deleting comments:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : "Delete failed" 
        });
    }
});

module.exports = router;