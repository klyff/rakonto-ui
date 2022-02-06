import React from 'react'
import Cookies from 'js-cookie'
import useUser from '../../../components/hooks/useUser'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const plans = [
  {
    tier: 1,
    link: 'https://rakonto.io/#pricing',
    title: 'Standard',
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_1_MONTH,
        price: 9.99
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_1_YEAR,
        price: 7.91
      }
    },
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
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_2_MONTH,
        price: 18.99
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_2_YEAR,
        price: 15.16
      }
    },
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
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_MONTH,
        price: 29.99
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_YEAR,
        price: 23.91
      }
    },
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

const Subscription: React.FC = () => {
  const user = useUser()
  const token = Cookies.get('token')
  const returnUrl = `${window.location.origin}/a/profile?tab=subscription`
  const [checked, setChecked] = React.useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const currentPlan = plans.find(plan => plan.tier === user!.tier)!
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {user!.tier !== 0 && (
        <>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" textAlign="center">
              Record and share life stories with{' '}
              <Link rel="noopener" target="_blank" href="https://rakonto.io/#pricing-free">
                basic features
              </Link>{' '}
              for free, or buy a plan that fits your needs
            </Typography>
            <Stack justifyContent="center" direction="row" spacing={1} marginY={4}>
              <Typography variant="h5">Monthly</Typography>
              <Switch onChange={handleChange} checked={checked} />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Yearly</Typography> <Typography variant="body2">(save up to 20%)</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mt={4} marginX={2}>
            <Grid container spacing={2}>
              {plans
                .filter(plan => plan.tier > 0)
                .map(({ title, price, features }) => {
                  const selectedPrice = price[checked ? 'year' : 'month']
                  return (
                    <Grid key={title} item xs minWidth={300}>
                      <Box elevation={4} component={Paper} borderRadius="40px" padding={2}>
                        <Stack
                          divider={<Divider flexItem />}
                          spacing={2}
                          direction="column"
                          justifyContent="space-between"
                          alignItems="strech"
                        >
                          <Box textAlign="center" paddingX={1}>
                            <Typography variant="h4">{title}</Typography>
                          </Box>
                          <Box>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                              <Box textAlign="center">
                                <form
                                  action={`/api/a/stripe/checkout?priceId=${selectedPrice.id}&returnUrl=${returnUrl}&jwt=${token}`}
                                  method="POST"
                                >
                                  <Stack>
                                    <Typography variant="h5" paddingY={2}>
                                      {`$${selectedPrice.price} / mo`}
                                    </Typography>
                                    {checked && (
                                      <Typography variant="h6" fontWeight={700} color="secondary" paddingY={2}>
                                        {`Billed $${Math.round(selectedPrice.price * 12)} annually`}
                                      </Typography>
                                    )}
                                  </Stack>
                                  {/* @ts-ignore */}
                                  <Button type="submit" variant="contained">
                                    Checkout
                                  </Button>
                                </form>
                              </Box>
                            </Stack>
                          </Box>
                          <Box>
                            <Box sx={{ height: 200 }}>
                              <List>
                                {features.map((feature, i) => (
                                  <ListItem key={i}>{feature}</ListItem>
                                ))}
                              </List>
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>
                  )
                })}
            </Grid>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" textAlign="center" marginTop={4}>
              Record and share life stories, with (TBD features) for free, no credit card required.
            </Typography>
          </Box>
        </>
      )}
      {user!.tier > 0 && (
        <>
          <Box mb={4}>
            <Typography variant="h5">
              Current subscription:{' '}
              <Link
                rel="noopener"
                target="_blank"
                key="professional"
                href={currentPlan?.link || 'https://rakonto.io/#pricing'}
              >
                {currentPlan?.title || 'Free'}
              </Link>
            </Typography>
          </Box>
          <form action={`/api/a/stripe/customer-portal?returnUrl=${returnUrl}&jwt=${token}`} method="POST">
            <Button variant="contained" type="submit">
              Manage Billing
            </Button>
          </form>
        </>
      )}
    </Box>
  )
}

export default Subscription
