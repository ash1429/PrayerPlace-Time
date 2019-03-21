var mongoose = require("mongoose");

var prayerPlace = new mongoose.Schema({
  
  location:{
    buildingInfo: { type: String, required: true },
    suburb: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  
  lat: String,
  lon: String,

  fajr: { hour: String, min: String, am_pm: String },
  dhuhr: { hour: String, min: String, am_pm: String },
  asr: { hour: String, min: String, am_pm: String },
  maghrib: { hour: String, min: String, am_pm: String },
  isha: { hour: String, min: String, am_pm: String },
  jumma: { hour: String, min: String, am_pm: String },

  privilege: String,

  provider: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    email: String
  },
  created: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("Prayerplace", prayerPlace);