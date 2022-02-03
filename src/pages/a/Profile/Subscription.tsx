import React from 'react'
import Cookies from 'js-cookie'
import useUser from '../../../components/hooks/useUser'

const Subscription: React.FC = () => {
  const user = useUser()
  const token = Cookies.get('token')
  const returnUrl = `${window.location.origin}/a/profile?tab=subscription`

  return (
    <>
      {user && user.tier === 0 && (
        <>
          <div>Standard $95.00 / year</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_1_YEAR}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <div>Standard $9.99 / month</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_1_MONTH}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <br />
          <div>Premiere $182.00 / year</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_2_YEAR}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <div>Premiere $18.99 / month</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_2_MONTH}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <br />
          <div>Professional $287.00 / year</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_3_YEAR}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <div>Professional $29.99 / month</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_3_MONTH}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
        </>
      )}

      <br />
      <br />
      <form action={`/api/a/stripe/customer-portal?returnUrl=${returnUrl}&jwt=${token}`} method="POST">
        <button type="submit">Manage Billing</button>
      </form>
    </>
  )
}

export default Subscription
