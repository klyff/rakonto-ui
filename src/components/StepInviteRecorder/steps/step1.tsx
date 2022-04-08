import React from 'react'
import Typography from '@mui/material/Typography'
import SearchCollections from '../../../components/SearchCollections'
import { useField } from 'formik'
import { TextField } from '@mui/material'
import { CollectionType } from '../../../lib/types'

const Step1: React.FC<{ allowSelectCollection: boolean | null }> = ({ allowSelectCollection }) => {
  const [{ value }, { touched: collectionTouched, error: collectionError }, { setValue, setTouched }] =
    useField<CollectionType | null>('collection')

  return (
    <>
      <Typography mb={2}>
        With Rakonto, you can ask other people to record short stories and save them in your library. It&apos;s a great
        way to quickly capture cherished memories, vignettes, feedback, learnings and so much more!
      </Typography>
      <Typography mb={2}>First, where would you like to save these recordings?</Typography>
      <div>
        {allowSelectCollection ? (
          <SearchCollections
            handleSelect={collection => {
              if (!collection) {
                setValue(null)
                return
              }
              setValue(collection)
            }}
            name="collection"
            onBlur={() => {
              setTouched(true)
            }}
            error={collectionTouched && Boolean(collectionError)}
            helperText={(collectionTouched && collectionError) || ' '}
            allowAdd
          />
        ) : (
          <TextField value={value?.title} fullWidth disabled />
        )}
      </div>
    </>
  )
}

export default Step1
