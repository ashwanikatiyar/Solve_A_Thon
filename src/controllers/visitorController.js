// src/controllers/visitorController.js
const Visitor = require('../models/visitor');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');

const accountSid = 'AC27723cf57fd795e8a60bdbc32f43b185';
const authToken = '8a1e35a35fb107d9828939a6b48ee7ab';
const twilioPhoneNumber = '+12513133289';

// const client = twilio(accountSid, authToken);
const client = require('twilio')(accountSid, authToken);

exports.captureDetails = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, purposeOfVisit } = req.body;

    // Generate OTP for phone verification
    const phoneVerificationOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Create a new visitor object
    const newVisitor = new Visitor({
      name,
      email,
      phoneNumber,
      address,
      purposeOfVisit,
      phoneVerificationOTP
    });

    // Save the visitor details to the database
    await newVisitor.save();

    // Send OTP to the visitor's phone number via SMS
    client.messages.create({
      body: `Your OTP for phone number verification: ${phoneVerificationOTP}`,
      from: twilioPhoneNumber,
      to: phoneNumber
    });

    // Response with expected checkout time
    res.status(201).json({ expectedCheckoutTime: newVisitor.expectedCheckoutTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
