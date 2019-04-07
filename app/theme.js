import { createMuiTheme } from '@material-ui/core/styles';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    grey: {
      dark: 'rgb(47,52,63)',
      light: 'rgb(83,87,93)'
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
  }
});

export default theme;
