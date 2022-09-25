
/** @jsxImportSource theme-ui */
import { polaris } from '@theme-ui/presets'
// import { funk } from '@theme-ui/presets'
// import { system } from '@theme-ui/presets'


export default {
  theme: polaris,
  buttons: {
    primary: {
      color: 'black',
      bg: 'green',
      border: 'none',
      borderRadius: '5px',
      boxShadow: '7px 6px 28px 1px rgba(0, 0, 0, 0.24)',
      '&:disabled': {
        bg: 'grey',
      },
      '&:active': {
        boxShadow: '7px 6px 28px 1px rgba(0, 0, 0, 0.24)',
        transform: 'translateY(4px)',
      },
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'black',
      bg: 'DarkKhaki',
      '&:hover': {
        bg: 'text',
      }
    },
  },
  text: {
    default: {
      color: 'text',
      fontSize: 1,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  }
}




