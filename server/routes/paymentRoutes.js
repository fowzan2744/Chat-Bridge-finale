const Stripe = require('stripe');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
router.post('/save-payment', async (req, res) => {
  const { sessionId, email } = req.body;

  console.log('Received save-payment:', req.body);

  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const user = await User.findOneAndUpdate(
      { emailId: email },
      { $set: { paymentId: sessionId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ success: true, message: 'Payment saved', user });
  } catch (err) {
    console.error('Error verifying payment:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
