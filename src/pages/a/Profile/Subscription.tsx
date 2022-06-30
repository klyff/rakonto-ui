import React, { useContext, useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie'
import useUser from '../../../components/UserProvider/useUser'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { ProductSubscriptionType } from '../../../lib/types'
import api from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import { format, parseJSON } from 'date-fns'

const plans = [
  {
    tier: 0,
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
      <>Record / upload audio and video stories</>,
      <>1 GB total library capacity</>,
      <>People/places/timeline tagging, photo/file uploads</>,
      <>Shared recording (request a story)</>
    ]
  },
  {
    tier: 1,
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
      <>Record / upload audio and video stories</>,
      <>10 GB total library capacity</>,
      <>People/places/timeline tagging, photo/file uploads</>,
      <>Shared recording (request a story)</>,
      <>Automated English transcription (coming soon Spanish, French, Italian, German, Dutch and Portuguese)</>
    ]
  },
  {
    tier: 2,
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
        price: 31
      }
    },
    features: [
      <>Record / upload audio and video stories</>,
      <>100 GB total library capacity</>,
      <>People/places/timeline tagging, photo/file uploads</>,
      <>Shared recording</>,
      <>Automated English transcription (coming soon Spanish, French, Italian, German, Dutch and Portuguese)</>,
      <>Collaboration (contributors and editors)</>
    ]
  },
  {
    tier: 3,
    link: 'https://rakonto.io/#pricing',
    title: 'Professional',
    price: {
      month: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_MONTH,
        price: 29
      },
      year: {
        id: process.env.REACT_APP_PIRCE_ID_TIER_3_YEAR,
        price: 23
      }
    },
    features: [
      <>Record / upload audio and video stories</>,
      <>Unlimited storage</>,
      <>People/places/timeline tagging, photo/file uploads</>,
      <>Shared recording</>,
      <>Automated English transcription (coming soon Spanish, French, Italian, German, Dutch and Portuguese)</>,
      <>Collaboration (contributors and editors)</>,
      <>White label recorder interface and messaging</>,
      <>Customized call-to-action</>,
      <>Rakonto embedded player</>
    ]
  }
]

const Subscription: React.FC = () => {
  const { user, isLoading } = useUser()
  const storage1 = useRef<HTMLFormElement>(null)
  const storage2 = useRef<HTMLFormElement>(null)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const token = Cookies.get('token')
  const returnUrl = `${window.location.origin}/a/profile?tab=subscription`
  const [checked, setChecked] = React.useState<boolean>(true)
  const [productSubscriptions, setProductSubscriptions] = useState<Array<ProductSubscriptionType>>([])

  const fetchStorageSubscriptions = async () => {
    const productSubscriptions: Array<ProductSubscriptionType> = await api.getProductSubscriptions()
    setProductSubscriptions(productSubscriptions)
  }

  useEffect(() => {
    fetchStorageSubscriptions()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const currentPlan = (user && plans.find(plan => plan!.tier === user!.tier)) || null

  const cancelProductSubscription = async (productSubscription: ProductSubscriptionType) => {
    const { id } = productSubscription
    await api.cancelProductSubscription(id)
    await fetchStorageSubscriptions()
    snackActions.open('Subscription cancelled')
  }

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {user!.tier === 0 && (
        <>
          <Box sx={{ width: '100%' }}>
            <Stack justifyContent="center" direction="row" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Monthly</Typography>
              </Stack>
              <Switch onChange={handleChange} checked={checked} />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Yearly</Typography> <Typography variant="body2">(save up to 22%)</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mt={4} marginX={2}>
            <Grid container spacing={2}>
              {plans.map(({ marked, tier, title, price, features }) => {
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
                            <Box textAlign="center" sx={{ height: 166 }}>
                              <form
                                action={`/api/a/stripe/checkout?priceId=${selectedPrice.id}&returnUrl=${returnUrl}&jwt=${token}`}
                                method="POST"
                              >
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
                                {/* @ts-ignore */}
                                {tier !== 0 && (
                                  <Button type="submit" variant="contained">
                                    Choose your plan
                                  </Button>
                                )}
                              </form>
                            </Box>
                          </Stack>
                        </Box>
                        <Box>
                          <Box sx={{ height: 408 }}>
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

          {/* {user!.tier === 3 && ( */}
          {/*  <> */}
          {/*    <form */}
          {/*      ref={storage1} */}
          {/*      action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_STORAGE_50_MONTH}&returnUrl=${returnUrl}&jwt=${token}`} */}
          {/*      method="POST" */}
          {/*    /> */}
          {/*    <form */}
          {/*      ref={storage2} */}
          {/*      action={`/api/a/stripe/checkout?priceId=${process.env.REACT_APP_PIRCE_ID_STORAGE_50_YEAR}&returnUrl=${returnUrl}&jwt=${token}`} */}
          {/*      method="POST" */}
          {/*    /> */}
          {/*    <ButtonGroup variant="contained"> */}
          {/*      <Button */}
          {/*        variant="contained" */}
          {/*        onClick={() => { */}
          {/*          storage1 && storage1.current?.submit() */}
          {/*        }} */}
          {/*      > */}
          {/*        Buy 50GB additional storage ($10 monthly) */}
          {/*      </Button> */}

          {/*      <Button */}
          {/*        variant="contained" */}
          {/*        onClick={() => { */}
          {/*          storage2 && storage2.current?.submit() */}
          {/*        }} */}
          {/*      > */}
          {/*        Buy 50GB additional storage ($8 annually) */}
          {/*      </Button> */}
          {/*    </ButtonGroup> */}
          {/*    {!!productSubscriptions.length && ( */}
          {/*      <> */}
          {/*        <Typography mt={2} variant="h5"> */}
          {/*          Active storage subscriptions */}
          {/*        </Typography> */}
          {/*        <List> */}
          {/*          {productSubscriptions.map(p => ( */}
          {/*            <ListItem */}
          {/*              button */}
          {/*              key={p.id} */}
          {/*              secondaryAction={<Button onClick={() => cancelProductSubscription(p)}>Cancel</Button>} */}
          {/*            > */}
          {/*              <ListItemText */}
          {/*                primary={`50GB ${ */}
          {/*                  process.env.REACT_APP_PIRCE_ID_STORAGE_50_YEAR === p.stripePriceId ? 'Year' : 'Month' */}
          {/*                }`} */}
          {/*                secondary={`on ${format(parseJSON(p.createdAt), 'PPPp')}`} */}
          {/*              /> */}
          {/*            </ListItem> */}
          {/*          ))} */}
          {/*        </List> */}
          {/*      </> */}
          {/*    )} */}
          {/*  </> */}
          {/* )} */}
        </>
      )}
    </Box>
  )
}

export default Subscription
