export const theme = {
  colorScheme: 'dark',
  fontFamily: 'Veranda, sans serif',
  spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
  components: {
    Card: {
      defaultProps: {
        py: '.5em',
        px: '1em',
        m: '.5em',
      },
    },
    Container: {
      defaultProps: {
        c: 'white',
      },
    },
    Header: {
      defaultProps: {
        c: 'white',
      },
    },
    Footer: {
      defaultProps: {
        c: 'white',
      },
    },
    Paper: {
      defaultProps: { color: 'white' },
    },
  },
};
