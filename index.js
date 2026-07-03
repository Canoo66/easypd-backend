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

// Rueckwaerts: Preis -> Credits (fuer Zahlungen ohne Metadata, z.B. Stripe Payment Links)
function getCreditsFromAmount(amountCents) {
  if (amountCents === 99)   return 5;
  if (amountCents === 399)  return 25;
  if (amountCents === 799)  return 60;
  if (amountCents === 1499) return 150;
  return 0;
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
      // WICHTIG: Nur session_id mitgeben — Credits werden serverseitig verifiziert!
      success_url: 'https://easypd.online/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://easypd.online/?cancelled=true',
      metadata: { credits: credits.toString() }
    });

    res.json({ url: session.url, session_id: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Zahlung verifizieren: Frontend schickt session_id, wir pruefen bei Stripe ob wirklich bezahlt
app.get('/verify-payment', async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId || !sessionId.startsWith('cs_')) {
      return res.status(400).json({ paid: false, error: 'Ungueltige Session-ID' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.json({ paid: false });
    }

    // Credits aus Metadata (create-checkout) oder aus dem Betrag ableiten (Payment Links)
    let credits = parseInt(session.metadata && session.metadata.credits) || 0;
    if (!credits) {
      credits = getCreditsFromAmount(session.amount_total);
    }

    if (!credits) {
      return res.json({ paid: false, error: 'Credits konnten nicht ermittelt werden' });
    }

    res.json({ paid: true, credits: credits, session_id: sessionId });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ paid: false, error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'EasyPD Backend laeuft!' });
});

// Lokal: Server starten. Auf Vercel: App exportieren (serverless).
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server laeuft auf Port', PORT);
  });
}

module.exports = app;
