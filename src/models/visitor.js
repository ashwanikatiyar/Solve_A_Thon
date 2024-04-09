// src/models/visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  purposeOfVisit: {
    type: String,
    required: true
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
  expectedCheckoutTime: {
    type: Date,
    default: function() {
      const checkoutTime = new Date(this.checkInTime);
      checkoutTime.setHours(checkoutTime.getHours() + 6); // Set checkout time 6 hours after check-in
      return checkoutTime;
    }
  },
  phoneVerificationOTP: {
    type: String
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
