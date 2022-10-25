import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

import { query as q} from 'faunadb'
import { fauna } from "../../services/fauna";

type UserFauna = {
  ref: {
    id: string
  },
  data: {
    stripe_customer_id: string
  }
}

export default async function handle(request: NextApiRequest, response: NextApiResponse) {

  if(request.method === "POST") {
    // const session = await getSession();
    const user = request.body.user

    const userFauna = await fauna.query<UserFauna>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(user.email)
        )
      )
    );

    let customerId = userFauna.data.stripe_customer_id

    if (!customerId){
      const stripeCustomer = await stripe.customers.create({
        // email: session.user.email,
        email: user.email,
      })

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), userFauna.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { 
          price: 'price_1LtFbIEMW3VxMqhgNeah8KXw', quantity: 1
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return response.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}