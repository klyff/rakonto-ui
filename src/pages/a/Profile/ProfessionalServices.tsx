import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'

const plans = [
  { content: ['$149 one-time fee'], plan: '00g8xbcpy6uS2888wG', isPopular: false },
  {
    content: ['Pay-as-you-go', 'Includes Training +', '1 Story Request Campaign', '$249 per campaign', '($249 total)'],
    plan: '28o6p39dm6uSbII5kt',
    isPopular: false
  },
  {
    content: [
      'SAVE 12%',
      '3-Pack',
      'Includes Training +',
      '3 Story Request Campaigns',
      '$209 per campaign',
      '($627 total)'
    ],
    plan: 'cN26p34X6f1ocMM008',
    isPopular: true
  },
  {
    content: [
      'SAVE 24%',
      '6-Pack',
      'Includes Training +',
      '6 Story Request Campaigns',
      '$179 per campaign',
      '($1,074 total)'
    ],
    plan: '28o7t72OY4mKbIIeV1',
    isPopular: false
  }
]

const Subscription: React.FC = () => {
  const returnUrl = `${window.location.origin}/a/profile?tab=professionalServices`
  const token = Cookies.get('token')

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
      <Box sx={{ bgcolor: 'background.paper', padding: 2, marginBottom: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Rakonto Professional Services
          </Typography>
          <Typography variant="h5" gutterBottom>
            Let us help you get the most out of your Rakonto subscription
          </Typography>
        </Box>
        <Box mt={4}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="700" gutterBottom>
                Training
              </Typography>
              <Typography>We’ll help you get Rakonto up and running with:</Typography>
              <ul>
                <li>
                  <Typography>One remote 60-minute recorded end user training (invite as many as you like)</Typography>
                </li>
                <li>
                  <Typography>
                    Configuration and process recommendations based on stated objectives, including your profile,
                    organization and collection types and custom call-to-action strategies
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="700" gutterBottom>
                Managed Services
              </Typography>
              <Typography>
                Our managed services offering includes training plus remote services to help you request, collect,
                curate and share stories, including personal and family stories, video testimonials, feedback, knowledge
                sharing and more:
              </Typography>
              <ul>
                <li>
                  <Typography>One remote 60-minute recorded end user training (invite as many as you like)</Typography>
                  <ul>
                    <li>
                      <Typography>
                        Story request definition, including collection creation, question framing, instruction drafting,
                        assistance recording video requests, parameter configuration, custom call-to-action
                        configuration and QR code / link generation
                      </Typography>
                    </li>
                    <li>
                      <Typography>Delivery of QR codes and links to you for distribution</Typography>
                    </li>
                    <li>
                      <Typography>Monitoring of recording submissions</Typography>
                    </li>
                    <li>
                      <Typography>
                        Curation of content received according to your criteria and approval workflows
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Publishing of curated content via the Rakonto Player (provision of embed code to your web
                        developer)
                      </Typography>
                    </li>
                  </ul>
                </li>
                <li>
                  <Typography>
                    Services are priced according to anticipated volume of approximately 100 responses or less per
                    request campaign
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4} mb={4}>
          <Grid container spacing={2}>
            {plans.map((item, i) => (
              <Grid key={i} item xs={12} md={3}>
                <Box
                  elevation={item.isPopular ? 12 : 3}
                  component={Paper}
                  sx={{
                    borderRadius: '40px',
                    padding: 3,
                    minHeight: '260px',
                    maxHeight: '320px',
                    height: '100%',
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box
                    sx={{
                      mb: 2
                    }}
                  >
                    {item.content.map((value, i) => (
                      <Typography align="center" key={i}>
                        {value}
                      </Typography>
                    ))}
                  </Box>
                  <Button size="large" variant="contained" href={`https://buy.stripe.com/${item.plan}`} target="_blank">
                    Buy
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mb={4}>
          <Typography align="center">
            Need more specialized services? <Link href="mailto:contact@rakonto.io">Contact us.</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Subscription
