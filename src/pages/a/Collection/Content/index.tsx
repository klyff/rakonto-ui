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
import { CollectionFormType, ImageType, StoryUpdateType } from '../../../../lib/types'
import collectionTypes from '../../../../lib/collectionTypes.json'
import MenuItem from '@mui/material/MenuItem'

interface iContent {
  title: string
  type?: string
  id: string
  description: string
  canEdit: boolean
  update: (formData: StoryUpdateType | CollectionFormType) => void
  onChange?: (image: ImageType) => void
}

const Content: React.FC<iContent> = ({ update, title, id, description, type, canEdit, children }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const initialValues = { title, description, type }

  const onSubmit = async (values: { title: string; description: string; type?: string }) => {
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
              {canEdit && (
                <div>
                  <IconButton onClick={() => setEditMode(true)}>
                    <CreateIcon />
                  </IconButton>
                </div>
              )}
            </Box>
            {description && (
              <Typography variant="h5" paragraph>
                {'    ' + description}
              </Typography>
            )}
          </>
        )}
        {editMode && (
          <form>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  name="type"
                  fullWidth
                  label="type"
                  select
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.type && Boolean(errors.type)}
                  helperText={(touched.type && errors.type) || ' '}
                >
                  {collectionTypes.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
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

export default Content
