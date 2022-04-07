import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import SearchCollections from '../../../components/SearchCollections'
import { useField } from 'formik'
import { CreateCollectionContext } from '../../CreateCollection'

const Step1 = () => {
  const [{ value }, { touched: collectionTouched, error: collectionError }, { setValue, setTouched }] =
    useField('collection')

  return (
    <>
      <Typography mb={2}>
        With Rakonto, you can ask other people to record short stories and save them in your library. It&apos;s a great
        way to quickly capture cherished memories, vignettes, feedback, learnings and so much more!
      </Typography>
      <Typography mb={2}>First, where would you like to save these recordings?</Typography>
      <div>
        <SearchCollections
          handleSelect={collection => {
            if (!collection) {
              setValue(null)
              return
            }
            setValue({ kind: 'COLLECTION', entity: collection })
          }}
          name="collection"
          onBlur={() => {
            setTouched(true)
          }}
          error={collectionTouched && Boolean(collectionError)}
          helperText={(collectionTouched && collectionError) || ' '}
          allowAdd
        />
      </div>
    </>
  )
}

export default Step1
