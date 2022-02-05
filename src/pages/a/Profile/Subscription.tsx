import React from 'react'
import Cookies from 'js-cookie'
import useUser from '../../../components/hooks/useUser'
import Plan from '../../../components/Plan'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

const Subscription: React.FC = () => {
  const user = useUser()
  const token = Cookies.get('token')
  const returnUrl = `${window.location.origin}/a/profile?tab=subscription`

  const plans = [
    {
      tier: 0,
      link: 'https://rakonto.io/#pricing',
      title: 'Free',
      prices: [],
      features: [
        <>30 minutes 720p video</>,
        <>1 hour audio</>,
        <>100 MB photo / file capacity</>,
        <Link rel="noopener" target="_blank" key="professional" href="https://rakonto.io/#pricing">
          Essential storytelling features
        </Link>
      ]
    },
    {
      tier: 1,
      link: 'https://rakonto.io/#pricing',
      title: 'Standard',
      prices: [
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_1_MONTH,
          price: '$9.99 / month',
          type: 'outlined'
        },
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_1_YEAR,
          price: '$95.00 / year *',
          type: 'contained'
        }
      ],
      features: [
        <>1 hour 720p video</>,
        <>5 hours audio</>,
        <>1 GB photo / file capacity</>,
        <Link rel="noopener" target="_blank" key="standard" href="https://rakonto.io/#pricing">
          Standard storytelling features
        </Link>
      ]
    },
    {
      tier: 2,
      link: 'https://rakonto.io/#pricing',
      title: 'Premiere',
      prices: [
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_2_MONTH,
          price: '$18.99 / month',
          type: 'outlined'
        },
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_2_YEAR,
          price: '$182.00 / year *',
          type: 'contained'
        }
      ],
      features: [
        <>1 hour 1080p video</>,
        <>10 hours audio</>,
        <>5 GB photo / file capacity</>,
        <Link rel="noopener" target="_blank" key="premium" href="https://rakonto.io/#pricing">
          Premium storytelling features
        </Link>
      ]
    },
    {
      tier: 3,
      link: 'https://rakonto.io/#pricing',
      title: 'Professional',
      prices: [
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_3_MONTH,
          price: '$29.99 / month',
          type: 'outlined'
        },
        {
          id: process.env.REACT_APP_PIRCE_ID_TIER_3_YEAR,
          description: '',
          price: '$287.00 / year *',
          type: 'contained'
        }
      ],
      features: [
        <>1 hour 4K video</>,
        <>20 hours audio</>,
        <>10 GB photo / file capacity</>,
        <Link rel="noopener" target="_blank" key="professional" href="https://rakonto.io/#pricing">
          Professional storytelling features
        </Link>
      ]
    }
  ]
  const currentPlan = plans.find(plan => plan.tier === user!.tier)!
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box mb={4}>
        <Typography variant="h5">
          Current subscription:{' '}
          <Link rel="noopener" target="_blank" key="professional" href={currentPlan.link}>
            {currentPlan.title}
          </Link>
        </Typography>
      </Box>
      {user!.tier === 0 && (
        <Box>
          <Grid container spacing={2}>
            {plans
              .filter(plan => plan.tier > 0)
              .map(plan => (
                <Plan
                  key={plan.title}
                  title={plan.title}
                  prices={plan.prices}
                  returnUrl={returnUrl}
                  token={token}
                  features={plan.features}
                />
              ))}
          </Grid>
          <Typography variant="subtitle2">* Pay annually ({'>'}25% savings over per month pricing)</Typography>
        </Box>
      )}
      {user!.tier > 0 && (
        <form action={`/api/a/stripe/customer-portal?returnUrl=${returnUrl}&jwt=${token}`} method="POST">
          <Button variant="contained" type="submit">
            Manage Billing
          </Button>
        </form>
      )}
    </Box>
  )
}

export default Subscription
