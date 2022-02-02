import { borderStyles, borderWidths, radii } from './border'
import { shadows } from './shadows'
import { colors, shades } from './color'
import { opacity } from './opacity'
import { space } from './space'
import {
  fontSizes,
  fontStretches,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
} from './typography'

export const tokens = {
  borderStyles,
  borderWidths,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  fontStretches,
  letterSpacings,
  lineHeights,
  opacity,
  radii,
  shades,
  shadows,
  space,
}

export type { Accent, Mode } from './color'
export type Tokens = typeof tokens
