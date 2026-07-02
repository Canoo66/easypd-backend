const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'https://easypd.online' }));
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Credit Pakete
const PACKAGES = {
  'price_5credits':   { credits: 5,   name: '5 Credits' },
  'price_25credits':  { credits: 25,  name: '25 Credits' },
  'price_60credits':  { credits: 60,  name: '60 Credits' },
  'price_150credits': { credits: 150, name: '150 Credits' },
};

// Stripe Checkout Session erstellen
app.post('/create-checkout', async (req, res) => {
  try {
    const { priceId, credits } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: credits + ' Credits — EasyPD' },
          unit_amount: getPriceInCents(credits),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://easypd.online?credits=' + credits + '&success=true',
      cancel_url: 'https://easypd.online?cancelled=true',
      metadata: { credits: credits.toString() }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function getPriceInCents(credits) {
  if (credits == 5)   return 99;
  if (credits == 25)  return 399;
  if (credits == 60)  return 799;
  if (credits == 150) return 1499;
  return 99;
}

// Stripe Webhook
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const credits = parseInt(session.metadata.credits);
    console.log('Zahlung erfolgreich! Credits:', credits);
    // Credits werden per URL Parameter an die Website übergeben
  }

  res.json({ received: true });
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'EasyPD Backend läuft!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server läuft auf Port', PORT);
});
