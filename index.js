const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['https://easypd.online', 'https://www.easypd.online'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

function getPriceInCents(credits) {
  if (credits == 5)   return 99;
  if (credits == 25)  return 399;
  if (credits == 60)  return 799;
  if (credits == 150) return 1499;
  return 99;
}

// Stripe Checkout Session erstellen
app.post('/create-checkout', async (req, res) => {
  try {
    const credits = parseInt(req.body.credits) || 5;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: credits + ' Credits — EasyPD',
            description: 'PDF Tools Credits fuer easypd.online'
          },
          unit_amount: getPriceInCents(credits),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://easypd.online?credits=' + credits + '&success=true&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://easypd.online?cancelled=true',
      metadata: { credits: credits.toString() }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'EasyPD Backend laeuft!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server laeuft auf Port', PORT);
});
