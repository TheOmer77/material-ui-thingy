import { paletteFromHex } from 'utils/colorUtils';

const blue = paletteFromHex('#2954ff'),
  orange = paletteFromHex('#ff5b29'),
  green = paletteFromHex('#00be00'),
  yellow = paletteFromHex('#fecc0a'),
  red = paletteFromHex('#ff2929'),
  lightblue = paletteFromHex('#0094fd'),
  pink = paletteFromHex('#ff206f'),
  purple = paletteFromHex('#5429ff'),
  cyan = paletteFromHex('#00d2fc'),
  brown = paletteFromHex('#7c4636');

const COLORS = {
  primary: blue,
  secondary: orange,
  success: green,
  warning: yellow,
  error: red,
  info: lightblue,

  red,
  pink,
  purple,
  blue,
  lightblue,
  cyan,
  green,
  yellow,
  orange,
  brown,
} as const;

export default COLORS;
