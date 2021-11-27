import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface iWatcherActionMenu {
  id: string
  deleteWatcher: (id: string) => void
  notifyWatcher: (id: string) => void
}

const WatcherActionMenu: React.FC<iWatcherActionMenu> = ({ id, notifyWatcher, deleteWatcher }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    deleteWatcher(id)
    handleClose()
  }

  const handleNotify = () => {
    notifyWatcher(id)
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleNotify}>Invite again</MenuItem>
        <MenuItem onClick={handleDelete}>delete</MenuItem>
      </Menu>
    </div>
  )
}

export default WatcherActionMenu
