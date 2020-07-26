import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  body: {
    height: '90%',
    maxHeight: '90%',
  },
  navigation: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    maxHeight: '10%',
    width: '100%',
    padding: 0,
    boxShadow:
      '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -5px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
  },
}))
