import React, { useState, useContext, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { OrganizationMemberType } from '../../../../lib/types'
import api from '../../../../lib/api'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ActionMenu from './ActionMenu'
import AddMemberModal from './AddMemberModal'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import useUser from '../../../../components/UserProvider/useUser'

interface iMembers {
  initialMembers: OrganizationMemberType[]
  id: string
}

const Members: React.FC<iMembers> = ({ initialMembers, id }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [localMembers, setLocalMembers] = useState<OrganizationMemberType[]>(initialMembers)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const { user } = useUser()

  const handleModalClose = useCallback(
    (member?: OrganizationMemberType) => {
      if (member) {
        setLocalMembers(value => [...value, member])
      }
      setShowAddModal(false)
    },
    [localMembers]
  )

  const handleRemove = useCallback(
    async (memberId: string) => {
      try {
        await api.organizationDeleteMembers(id, memberId)
        setLocalMembers(value => {
          return value.filter(member => member.id !== memberId)
        })
        snackActions.open(`Member removed with success`)
      } catch (error) {
        snackActions.open(`Problem to remove member from organisation`)
      }
    },
    [localMembers]
  )
  console.log(localMembers)
  return (
    <>
      <Box sx={{ width: '100%', height: '100%', minHeight: 'inherit', bgcolor: 'background.paper' }}>
        <Box component="form" sx={{ padding: 2, marginBottom: 3 }}>
          <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '422px' }}>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ paddingTop: 1, ml: 2, mb: 2 }} variant="h6">
                Add member to your organisation
              </Typography>
              <Button onClick={() => setShowAddModal(true)} startIcon={<AddIcon />} variant="outlined">
                Add
              </Button>
            </Box>
            <List subheader={<ListSubheader component="div">Members</ListSubheader>}>
              {localMembers.map(member => (
                <ListItem
                  key={member.id}
                  secondaryAction={
                    user.email === member.user.email ? null : (
                      <ActionMenu id={member.id} remove={() => handleRemove(member.id)} />
                    )
                  }
                >
                  <ListItemText primary={member.user.email} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      {showAddModal && <AddMemberModal id={id} onClose={handleModalClose} />}
    </>
  )
}

export default Members
