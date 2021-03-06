import React from 'react'
import Cookies from 'js-cookie'
import { formatDuration, intervalToDuration, parseJSON } from 'date-fns'
import useUser from '../../../components/UserProvider/useUser'
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
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'

const plans = [
  {
    tier: 0,
    buttonLabel: 'Subscribe today!',
    link: 'https://rakonto.io/#pricing',
    title: 'Free',
    price: {
      month: {
        id: '',
        price: 0
      },
      year: {
        id: '',
        price: 0
      }
    },
    features: [
      <>
        <Box component="ul" sx={{ paddingInlineStart: '10px' }}>
          <li>Record / upload audio and video stories</li>
          <li>1 GB total library capacity</li>
          <li>People / places / timeline tagging, photo / file uploads</li>
          <li>Shared recording (request a story)</li>
        </Box>
      </>
    ]
  },
  {
    tier: 1,
    buttonLabel: 'Subscribe today!',
    link: 'https://rakonto.io/#pricing',
    title: 'Standard',
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_1_MONTH,
        price: 9
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_1_YEAR,
        price: 7
      }
    },
    features: [
      <>Everything in Free plus:</>,
      <>
        <Box component="ul">
          <li>10 GB total library capacity</li>
          <li>Automated English transcription</li>
        </Box>
      </>
    ]
  },
  {
    tier: 2,
    buttonLabel: 'Subscribe today!',
    link: 'https://rakonto.io/#pricing',
    title: 'Advanced',
    marked: true,
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_2_MONTH,
        price: 39
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_2_YEAR,
        price: 29
      }
    },
    features: [
      <>Everything in Standard plus:</>,
      <>
        <Box component="ul">
          <li>100 GB total library capacity</li>
          <li>Collaboration (contributors and editors)</li>
          <li>Rakonto embedded player</li>
        </Box>
      </>
    ]
  },
  {
    tier: 3,
    buttonLabel: 'Subscribe today!',
    link: 'https://rakonto.io/#pricing',
    title: 'Professional',
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_MONTH,
        price: 79
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_YEAR,
        price: 59
      }
    },
    features: [
      <>Everything in Advanced plus:</>,
      <>
        <Box component="ul">
          <li>Unlimited storage</li>
          <li>Branded recorder interface and messaging</li>
          <li>Customized call-to-action</li>
        </Box>
      </>
    ]
  },
  {
    tier: 4,
    buttonLabel: 'Contact us!',
    link: 'https://rakonto.io/#getintouch',
    title: 'Enterprise',
    price: {
      month: {
        id: '',
        price: null
      },
      year: {
        id: '',
        price: null
      }
    },
    features: [
      <>Need more features?</>,
      <>
        <ul>
          <li>Multiple users</li>
          <li>Third party integrations</li>
          <li>Hosting in your technology stack</li>
          <li>Customizations</li>
        </ul>
      </>,
      <>Contact our sales team today for pricing</>
    ]
  }
]

const Subscription: React.FC = () => {
  const { user, isLoading } = useUser()
  const token = Cookies.get('token')
  const returnUrl = `${window.location.origin}/a/profile?tab=subscription`
  const [checked, setChecked] = React.useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const currentPlan = (user && plans.find(plan => plan!.tier === user!.tier)) || null

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100%', bgcolor: 'background.paper', padding: 2 }}>
      {user!.tier === 0 || user!.trial ? (
        <>
          <Box sx={{ width: '100%' }}>
            {user!.trial && user!.freeTrialUntilAt && (
              <Box mb={4}>
                <Typography component="span" variant="h5">
                  Your trial period ends in{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    {formatDuration(
                      intervalToDuration({
                        start: new Date(),
                        end: parseJSON(user.freeTrialUntilAt)
                      }),
                      {
                        format: ['days']
                      }
                    )}
                  </Box>
                </Typography>
                <Typography component="span" variant="h6">
                  {' '}
                  choose a plan and subscribe
                </Typography>
              </Box>
            )}
            <Stack justifyContent="center" direction="row" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Monthly</Typography>
              </Stack>
              <Switch onChange={handleChange} checked={checked} />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Yearly save up to 25%</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mt={4} marginX={2}>
            <Grid container spacing={2}>
              {plans.map(({ marked, tier, title, price, features, buttonLabel, link }) => {
                const selectedPrice = price[checked ? 'year' : 'month']
                return (
                  <Grid key={title} item xs minWidth={300}>
                    <Box elevation={marked ? 12 : 3} component={Paper} borderRadius="40px" padding={2}>
                      <Stack
                        divider={<Divider flexItem />}
                        spacing={2}
                        direction="column"
                        justifyContent="space-between"
                        alignItems="strech"
                      >
                        <Box textAlign="center" paddingX={1}>
                          <Typography color={marked ? 'primary' : ''} variant="h4">
                            {title}
                          </Typography>
                        </Box>
                        <Box>
                          <Stack direction="row" justifyContent="center" alignItems="center">
                            <Box
                              component="form"
                              action={`/api/a/stripe/checkout?priceId=${selectedPrice.id}&returnUrl=${returnUrl}&jwt=${token}`}
                              method="POST"
                              textAlign="center"
                              sx={{ height: 166, display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}
                            >
                              {selectedPrice.price !== null ? (
                                <Stack>
                                  <Typography color={marked ? 'primary' : ''} variant="h5" paddingY={2}>
                                    {`$ ${selectedPrice.price} / mo`}
                                  </Typography>
                                  <Box textAlign="center" sx={{ height: 64 }}>
                                    {checked && tier !== 0 && (
                                      <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        color={marked ? 'primary' : 'secondary'}
                                        paddingY={2}
                                      >
                                        {`Billed $${Math.round(selectedPrice.price * 12)} annually`}
                                      </Typography>
                                    )}
                                  </Box>
                                </Stack>
                              ) : (
                                <Box sx={{ flex: 1 }} />
                              )}
                              {tier !== 0 && tier !== 4 && (
                                <Button type="submit" variant="contained">
                                  {buttonLabel}
                                </Button>
                              )}
                              {tier === 4 && (
                                <Button href={link} target="_Blank" variant="contained">
                                  {buttonLabel}
                                </Button>
                              )}
                            </Box>
                          </Stack>
                        </Box>
                        <Box>
                          <Box sx={{ height: 230 }}>
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
        </>
      ) : (
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
            <Button
              sx={{
                mb: 4
              }}
              variant="contained"
              type="submit"
            >
              Manage Billing
            </Button>
          </form>
        </>
      )}
    </Box>
  )
}

export default Subscription
