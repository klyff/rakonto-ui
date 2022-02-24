import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import { useField, FieldArray } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CircularProgress } from '@mui/material'

const Step4: React.FC<{ loading: boolean; url: string }> = ({ loading, url }) => {
  const [
    { onBlur: emailOnBlur, onChange: emailOnChange, value: emailValue },
    { touched: emailTouched, error: emailError },
    { setValue: setEmailValue }
  ] = useField('email')
  const [
    { onBlur: nameOnBlur, onChange: nameOnChange, value: nameValue },
    { touched: nameTouched, error: nameError },
    { setValue: setNameValue }
  ] = useField('name')
  const [{ value: emails }, { error: emailsError }, { setTouched: setEmailsTouched }] =
    useField<{ email: string; name: string }[]>('emails')
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <FieldArray name="emails">
            {({ remove, push }) => (
              <>
                <Typography>
                  Who would you like to invite to record stories? You can invite specific recorders via email, or you
                  can leave blank for open invitations to record
                </Typography>
                <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                  <TextField
                    autoFocus
                    key="email"
                    name="email"
                    fullWidth
                    margin="dense"
                    placeholder="Type an email address (optional)"
                    onBlur={e => {
                      emailOnBlur(e)
                      setEmailsTouched(true)
                    }}
                    value={emailValue}
                    onChange={emailOnChange}
                    error={emailTouched && (Boolean(emailError) || Boolean(emailsError))}
                    helperText={(emailTouched && emailError) || emailsError || ' '}
                  />
                  <TextField
                    autoFocus
                    key="name"
                    name="name"
                    fullWidth
                    margin="dense"
                    placeholder="Type the name of recorder"
                    onBlur={e => {
                      nameOnBlur(e)
                      setEmailsTouched(true)
                    }}
                    value={nameValue}
                    onChange={nameOnChange}
                    error={nameTouched && (Boolean(nameError) || Boolean(emailsError))}
                    helperText={(nameTouched && nameError) || emailsError || ' '}
                  />
                  <Box sx={{ alignSelf: 'flex-end' }}>
                    <Button
                      disabled={
                        !nameValue ||
                        (nameTouched && Boolean(nameError)) ||
                        !emailValue ||
                        (emailTouched && Boolean(emailError))
                      }
                      variant="contained"
                      onClick={() => {
                        push({ email: emailValue, name: nameValue })
                        setEmailValue('')
                        setNameValue('')
                      }}
                    >
                      add
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ height: 100, overflow: 'auto', mt: 2 }} component={Paper}>
                  {emails.map(({ email, name }, index) => (
                    <List key={index}>
                      <ListItem>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => remove(index)} edge="end">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemText primary={email} secondary={name} />
                      </ListItem>
                    </List>
                  ))}
                </Box>
              </>
            )}
          </FieldArray>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column'
            }}
          >
            <Typography sx={{ mb: 4 }}>Share link:</Typography>
            {!loading ? (
              <>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`} />
                <Box
                  sx={{
                    mt: 2
                  }}
                >
                  <CopyToClipboard text="Link">
                    <Button variant="outlined">Copy to clipboard</Button>
                  </CopyToClipboard>
                </Box>
              </>
            ) : (
              <>
                <Box
                  component={Paper}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexFlow: 'column',
                    width: 200,
                    height: 200
                  }}
                >
                  <CircularProgress variant="indeterminate" size={80} />
                  <Typography variant="caption" sx={{ marginY: 2 }}>
                    generating the link...
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Step4
