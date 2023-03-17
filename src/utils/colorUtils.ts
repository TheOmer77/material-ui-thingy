import {
  argbFromHex,
  Hct,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';

export const TONES = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 98,
] as const;

export const paletteFromHex = (hex: string) => {
  const tonalPalette = TonalPalette.fromInt(argbFromHex(hex));
  return TONES.reduce(
    (obj, tone) => ({ ...obj, [tone]: hexFromArgb(tonalPalette.tone(tone)) }),
    {}
  ) as {
    [K in typeof TONES[number]]: string;
  };
};

export const getNeutralVariant = (hex: string, divideChromaBy = 3) => {
  const { hue, chroma, tone } = Hct.fromInt(argbFromHex(hex));
  return hexFromArgb(Hct.from(hue, chroma / divideChromaBy, tone).toInt());
};
