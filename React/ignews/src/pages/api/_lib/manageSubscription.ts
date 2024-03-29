import { query as q } from 'faunadb'
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {

  //buscando todos os campos do Usuário, mas queremos apenas a ref, por isso usamos o select
  const userRef = await fauna.query(
   q.Select(
    "ref",
    q.Get(
      q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
      )
    )
   )
  )

  //Todos os dados da subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  //

  // Pegando somente os dados importantes
  const subscriptionData = {
    id: subscriptionId,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }
  console.log(subscription.status);
  //

  // Salvando dados no FaunaDB
  if(createAction) {
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {data: subscriptionData}
      )
    )
  }else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
}