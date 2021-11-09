import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Comments from '../../../components/Comments'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { aboutSchema } from './schemas'
import { CollectionFormType } from '../../../lib/types'

interface iAbout {
  title: string
  collectionId: string
  description: string
  canEdit: boolean
  update: (formData: CollectionFormType) => void
}

const About: React.FC<iAbout> = ({ update, title, collectionId, description, canEdit }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [hover, setHover] = useState<boolean>(false)

  const initialValues = { title: title, description: description }

  const onSubmit = async (values: { title: string; description: string }) => {
    try {
      await update({ ...values })
      setEditMode(false)
    } catch (error) {}
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: aboutSchema,
    onSubmit
  })

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex'
      }}
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        component={Paper}
        sx={{
          width: '100%',
          padding: 3
        }}
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
              {hover && (
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
      <Box
        sx={{
          width: 500,
          paddingLeft: 1
        }}
      >
        <Comments type={'collection'} id={collectionId} watchers={[]} />
      </Box>
    </Box>
  )
}

export default About
