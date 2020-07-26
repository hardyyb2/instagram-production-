import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import { UserActions, ThemeOptions, changeTheme } from '../../store/actions'
import { IState } from '../../store/types'
import { theme as color } from './colors'

interface IProps {
  theme: ThemeOptions
}

const UITheme: React.FC<IProps> = ({ theme, children }) => {
  const mainPrimaryColor =
    theme === 'dark' ? '#1f1f2d' : color.palette.primary.main
  const mainSecondaryColor =
    theme === 'dark' ? '#1f1f1f' : color.palette.secondary.main

  const darkTheme = createMuiTheme({
    palette: {
      type: theme,

      primary: {
        light: color.palette.primary.light,
        main: mainPrimaryColor,
      },
      secondary: {
        light: color.palette.secondary.light,
        main: mainSecondaryColor,
        dark: color.palette.secondary.dark,
      },
      warning: {
        light: color.palette.warning.light,
        main: color.palette.warning.main,
        dark: color.palette.warning.dark,
      },
      info: {
        light: color.palette.info.light,
        main: color.palette.info.main,
      },
    },
  })

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}

const mapStateToProps = (state: IState) => {
  return {
    theme: state.user.theme,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    changeThemeConnect: (theme: ThemeOptions) => dispatch(changeTheme(theme)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UITheme)
