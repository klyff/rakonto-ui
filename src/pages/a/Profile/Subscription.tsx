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
          <div>Bronze USD 1,00 / monthly</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_1}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <br />
          <div>Silver USD 2,00 / monthly</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_2}&returnUrl=${returnUrl}&jwt=${token}`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
          <br />
          <div>Gold USD 3,00 / monthly</div>
          <form
            action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_TIER_3}&returnUrl=${returnUrl}&jwt=${token}`}
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
