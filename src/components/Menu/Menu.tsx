import React from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import useStyles from './Menu.styles'

interface MenuItemProps {
  title: string
  icon: string
  color?: string
  handleClick: () => void
}

interface IProps {
  anchorEl: HTMLElement | null
  handleClose: () => void
  menuItems?: MenuItemProps[]
}

const SMenu: React.FC<IProps> = ({ anchorEl, handleClose, menuItems }) => {
  const classes = useStyles()

  const getIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'delete':
        return <DeleteOutlineIcon />
      case 'logout':
        return <ExitToAppIcon />
      default:
        return <DeleteOutlineIcon />
    }
  }

  return (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {menuItems &&
        menuItems.map((item, index) => (
          <MenuItem key={item.title} className={classes.listItem}>
            <Button
              startIcon={getIcon(item.icon)}
              onClick={item.handleClick}
              className={classes.button}
              style={{
                color: item.color,
              }}
            >
              {item.title}
            </Button>
          </MenuItem>
        ))}
    </Menu>
  )
}

export default SMenu
