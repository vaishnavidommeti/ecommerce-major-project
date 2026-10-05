import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'

const app = express()
const port = Number(process.env.PORT || 4242)
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null

const products = {
  'arc-lamp': { name: 'Arc table lamp', unitAmount: 14800 },
  'form-vase': { name: 'Form no. 02 vase', unitAmount: 6400 },
  'everyday-throw': { name: 'Everyday throw', unitAmount: 11200 },
  'mori-chair': { name: 'Mori lounge chair', unitAmount: 59000 },
  'stoneware-set': { name: 'Sunday stoneware set', unitAmount: 8600 },
  'linen-cushion': { name: 'Linen cushion cover', unitAmount: 4800 },
  'paper-pendant': { name: 'Paper pendant light', unitAmount: 22500 },
  'oak-side-table': { name: 'Oak side table', unitAmount: 34000 },
}

app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', paymentConfigured: Boolean(stripe) })
})

app.post('/api/create-checkout-session', async (request, response) => {
  if (!stripe) {
    return response.status(503).json({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to the backend environment.' })
  }

  const { items } = request.body || {}
  if (!Array.isArray(items) || items.length === 0 || items.length > 25) {
    return response.status(400).json({ error: 'Add at least one item to your bag before checkout.' })
  }

  const seenIds = new Set()
  const lineItems = []
  for (const item of items) {
    const product = products[item?.id]
    if (!product || seenIds.has(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      return response.status(400).json({ error: 'Your bag contains an invalid item or quantity. Please review it and try again.' })
    }
    seenIds.add(item.id)
    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: product.unitAmount,
        product_data: { name: product.name },
      },
    })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${frontendUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/?checkout=cancel`,
    })
    return response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error.message)
    return response.status(502).json({ error: 'The payment provider could not start checkout. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`Forma checkout API listening on http://localhost:${port}`)
})