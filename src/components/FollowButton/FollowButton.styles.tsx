import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  following: {
    background: `${theme.palette.primary.main} !important`,
    border: ` 2px solid ${theme.palette.secondary.dark} !important`,
    color: `${theme.palette.secondary.dark} !important`,
  },
}))
