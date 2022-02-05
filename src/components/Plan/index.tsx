import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonPropsVariantOverrides } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import { OverridableStringUnion } from '@mui/types'

interface iPlan {
  returnUrl: string
  token?: string
  title: string
  prices: {
    id?: string
    price: string
    type: string
  }[]
  features: ReactNode[]
}

const Plan: React.FC<iPlan> = ({ title, returnUrl, prices, token, features }) => {
  return (
    <Grid
      item
      xs
      component={Paper}
      sx={{
        border: '1px solid rgba(255, 255, 255, 0.23)',
        padding: 3,
        borderRadius: 10,
        minWidth: '300px',
        mr: 2,
        ml: 2,
        mb: 2
      }}
    >
      <Grid container spacing={2} direction="column" justifyContent="space-between" alignItems="strech">
        <Grid xs item textAlign="center" paddingX={1}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              paddingY: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.23)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.23)'
            }}
          >
            {prices.map(({ price, id, type }) => (
              <Grid
                item
                xs={12}
                key={id}
                sx={{
                  textAlign: 'center'
                }}
              >
                <form action={`/api/a/stripe/checkout?priceId=${id}&returnUrl=${returnUrl}&jwt=${token}`} method="POST">
                  <Typography variant="h5" paddingY={2}>
                    {price}
                  </Typography>
                  {/* @ts-ignore */}
                  <Button type="submit" variant={type}>
                    Checkout
                  </Button>
                </form>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs item>
          <Box sx={{ height: 200 }}>
            <List>
              {features.map((feature, i) => (
                <ListItem key={i}>{feature}</ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Plan
