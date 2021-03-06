import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import schema from './schema'
import { CollectionFormType, StoryUpdateType } from '../../../../lib/types'

interface iAbout {
  title: string
  id: string
  description: string
  isEditor: boolean
  update: (formData: StoryUpdateType | CollectionFormType) => void
}

const About: React.FC<iAbout> = ({ update, title, id, description, isEditor, children }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const initialValues = { title: title, description: description }

  const onSubmit = async (values: { title: string; description: string }) => {
    try {
      await update({ ...values })
      setEditMode(false)
    } catch (error) {}
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        '&>*': {
          margin: '12px 0'
        }
      }}
    >
      <Box
        sx={{
          padding: '0 24px'
        }}
        component={Paper}
      >
        {!editMode && (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex'
              }}
            >
              <Typography
                sx={{
                  flex: '1'
                }}
                variant="h4"
                gutterBottom
              >
                {title}
              </Typography>
              {isEditor && (
                <div>
                  <IconButton onClick={() => setEditMode(true)}>
                    <CreateIcon />
                  </IconButton>
                </div>
              )}
            </Box>
            <Typography variant="h5" paragraph>
              {'    ' + description}
            </Typography>
          </>
        )}
        {editMode && (
          <form>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  name="title"
                  fullWidth
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={(touched.title && errors.title) || ' '}
                />
                <TextField
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={(touched.description && errors.description) || ' '}
                />
              </Grid>
              <Grid
                sx={{
                  textAlign: 'end'
                }}
                item
                xs={12}
              >
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button color={'primary'} disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <Box component={Paper}>{children}</Box>
    </Box>
  )
}

export default About
