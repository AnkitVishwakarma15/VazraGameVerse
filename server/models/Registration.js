const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  team_name: { type: String, required: false },
  game: { type: String, required: true },
  player_name: { type: String, required: true },
  in_game_username: { type: String, required: true },
  in_game_id: { type: String, required: true },
  section: { type: String, required: true },
  admission_no: { type: String, required: true },
  contact: { type: String, required: true },
  utr_id: { type: String, required: true },
  screenshot_url: { type: String, required: true }
});

module.exports = mongoose.model('Registration', registrationSchema);
