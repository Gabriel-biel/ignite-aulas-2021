import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false
  }
}

const revelantEvents = new Set([
  'checkout.session.completed',
  // 'customer.subscription.created',
  // 'customer.subscription.updated',
  // 'customer.subscription.deleted',
])

export default async function HandleWebhook(request: NextApiRequest, response: NextApiResponse) {
  if(request.method === 'POST') {
    const buf = await buffer(request);
    const secret = request.headers['stripe-signature']

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    }catch (err){
      return response.status(400).send(`WebHook Error: ${err.message}`);
    }

    const { type } = event;

    if(revelantEvents.has(type)) {
      try {
        switch (type) {
          // case 'customer.subscriptions.completed':
          // case 'customer.subscriptions.created':
          // case 'customer.subscriptions.updated':

          //   const subscription = event.data.object as Stripe.Subscription;

          //   await saveSubscription(
          //     subscription.id,
          //     subscription.customer.toString(),
          //     // type === 'customer.subscriptions.created',
          //   )

          //   break;
          // case 'checkout.session.deleted':
          case 'checkout.session.completed':
            
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              // true,
              )

          break;
          default: 
            throw new Error('Unhandled event.')
        }
      } catch (err){
        return response.json({error: 'webhook handle failed'})
      }
    }

    response.json({reciveid: true})
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}