const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Registration = require("./models/Registration");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint (useful for Render deployment health checks)
app.get("/", (req, res) => {
  res.send("Vazra GameVerse Backend API is running!");
});

// MongoDB Connection Setup
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Don't keep server hanging if DB connection fails
    process.exit(1);
  }
};

// Start Server & Connect to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// ========================================
// GET REGISTRATION STATUS
// ========================================

const SLOT_LIMITS = {
  freefire: 48,
  bgmi: 20,
};

const MANUAL_REGISTRATION_STATUS = {
  freefire: true,
  bgmi: false,
};

app.get("/api/status", async (req, res) => {
  try {
    const status = { ...MANUAL_REGISTRATION_STATUS };

    if (status.freefire) {
      const count = await Registration.countDocuments({
        game: { $regex: /free fire/i },
      });

      if (count >= SLOT_LIMITS.freefire) {
        status.freefire = false;
      }
    }

    if (status.bgmi) {
      const count = await Registration.countDocuments({
        game: { $regex: /bgmi/i },
      });

      if (count >= SLOT_LIMITS.bgmi) {
        status.bgmi = false;
      }
    }

    res.json(status);
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ========================================
// REGISTER PLAYER
// ========================================

app.post("/api/register", async (req, res) => {
  try {
    const {
      team_name,
      game_slug,
      game,
      name,
      in_game_username,
      in_game_id,
      section,
      admission_no,
      contact,
      utr_id,
      screenshot_url,
    } = req.body;

    const key =
      game_slug === "freefire" || game_slug === "free-fire"
        ? "freefire"
        : "bgmi";

    let isOpen = MANUAL_REGISTRATION_STATUS[key];

    if (isOpen) {
      const count = await Registration.countDocuments({
        game: new RegExp(key === "freefire" ? "free fire" : "bgmi", "i"),
      });

      if (count >= SLOT_LIMITS[key]) {
        isOpen = false;
      }
    }

    if (!isOpen) {
      return res.status(400).json({
        error: "Registrations are closed or seats are full.",
      });
    }

    // SAVE TO MONGODB
    const finalGame =
      game ||
      (key === "freefire"
        ? "Free Fire MAX (1v1)"
        : "BGMI (Battlegrounds Mobile India)");

    const finalScreenshot = screenshot_url || "Cloud Upload Failed - Check UTR";

    const newRegistration = new Registration({
      team_name: team_name || "",
      game: finalGame,
      player_name: name,
      in_game_username,
      in_game_id,
      section,
      admission_no,
      contact,
      utr_id,
      screenshot_url: finalScreenshot,
    });

    await newRegistration.save();
    console.log("MongoDB registration saved");

    // SEND TO GOOGLE SHEETS
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!googleSheetsUrl) {
      console.error("GOOGLE_SHEETS_WEB_APP_URL missing from env");
      return res.status(500).json({
        error: "Saved to MongoDB but Google Sheets URL is missing.",
      });
    }

    const sheetPayload = {
      name,
      admission_no,
      in_game_username,
      in_game_id,
      section,
      contact,
      utr_id,
      screenshot_url: finalScreenshot,
      game: finalGame,
    };

    console.log("Sending registration to Google Sheets...");

    const sheetResponse = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetPayload),
      redirect: "follow",
    });

    const sheetResult = await sheetResponse.text();

    console.log("Google Sheets HTTP Status:", sheetResponse.status);
    console.log("Google Sheets Response:", sheetResult);

    if (!sheetResponse.ok) {
      return res.status(502).json({
        error: "Saved to MongoDB but Google Sheets sync failed.",
      });
    }

    res.status(201).json({
      message: "Registration successful",
      googleSheetsSynced: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Server error during registration sync",
    });
  }
});
