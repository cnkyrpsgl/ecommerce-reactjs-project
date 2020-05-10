export interface Theme {
  color: string;
  hoverColor: string;
}

interface Themes {
  [key: string]: Theme;
}

const themes: Themes = {
  DARK: {
    color: '#632d00',
    hoverColor: '#d50000',
  },
  LIGHT: {
    color: '#ec863a',
    hoverColor: '#6cc0e5',
  },
};

export default themes;
