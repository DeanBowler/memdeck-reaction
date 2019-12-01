const basePalette = {
  base: '#4a4a4a',
};

const primaryPalette = {
  primary: '#1489b0',
  primaryShade: '#196d8d',
};

const positivePalette = {
  positive: '#33d167',
};

const negativePalette = {
  negative: '#de344f',
};

const grey = {
  grey100: '#222e32',
  grey90: '#38474e',
  grey80: '#4c5c63',
  grey50: '#8c9aa1',
  grey30: '#b8c2c7',
  grey20: '#d0d6da',
  grey10: '#e7eaec',
  grey5: '#f3f4f5',
  white: '#fff',
};

const shadows = {
  boxShadow: '0px 5px 0px -1px rgba(0, 0, 0, 0.1)',
  boxShadowTaller: '0px 8px 0px -2px rgba(0, 0, 0, 0.1)',
};

export default {
  ...grey,
  ...basePalette,
  ...primaryPalette,
  ...positivePalette,
  ...negativePalette,
  ...shadows,
};
