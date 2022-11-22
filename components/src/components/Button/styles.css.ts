import { createVar, style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '../../css'

const boxShadowColorVar = createVar()
const buttonSize = createVar()

const shape = {
  circle: atoms({
    borderRadius: 'full',
  }),
  rounded: atoms({
    borderRadius: 'medium',
  }),
  square: atoms({
    borderRadius: 'none',
  }),
}

export type Shape = keyof typeof shape

const size = {
  small: atoms({
    fontSize: 'tiny',
    height: '6',
    paddingX: '4',
  }),
  medium: atoms({
    fontSize: 'small',
    height: '12',
    paddingX: '5',
  }),
  large: atoms({
    fontSize: 'regular',
    height: '14',
    paddingX: '6',
  }),
}

export type Size = keyof typeof size

const getAccentVars = (colorVar: CSSVarFunction) => ({
  [vars.colors.accent]: rgb(colorVar),
  [vars.colors.accentText]: vars.colors.white,
  [vars.colors.accentSecondary]: rgb(
    colorVar,
    vars.mode.shades.accentSecondary,
  ),
  [vars.colors.accentSecondaryHover]: rgb(
    colorVar,
    vars.mode.shades.accentSecondaryHover,
  ),
})

const tone = {
  accent: {},
  background: {},
  blue: style({
    vars: getAccentVars(vars.mode.colors.blue),
  }),
  green: style({
    vars: getAccentVars(vars.mode.colors.green),
  }),
  indigo: style({
    vars: getAccentVars(vars.mode.colors.indigo),
  }),
  orange: style({
    vars: getAccentVars(vars.mode.colors.orange),
  }),
  pink: style({
    vars: getAccentVars(vars.mode.colors.pink),
  }),
  purple: style({
    vars: getAccentVars(vars.mode.colors.purple),
  }),
  red: style({
    vars: getAccentVars(vars.mode.colors.red),
  }),
  teal: style({
    vars: getAccentVars(vars.mode.colors.teal),
  }),
  yellow: style({
    vars: getAccentVars(vars.mode.colors.yellow),
  }),
}

export type Tone = keyof typeof tone

const variant = {
  primary: style([
    atoms({
      color: 'accentText',
      backgroundColor: 'accent',
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.accent,
      },
    }),
  ]),
  secondary: style([
    atoms({
      color: 'accent',
      backgroundColor: {
        base: 'accentSecondary',
        hover: 'accentSecondaryHover',
        active: 'accentSecondaryHover',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.accentSecondary,
      },
      selectors: {
        '&:hover': {
          vars: {
            [boxShadowColorVar]: vars.colors.accentSecondaryHover,
          },
        },
        '&:active': {
          vars: {
            [boxShadowColorVar]: vars.colors.accentSecondaryHover,
          },
        },
      },
    }),
  ]),
  tertiary: style([
    atoms({
      color: 'text',
      backgroundColor: {
        base: 'foregroundSecondary',
        hover: 'foregroundSecondaryHover',
        active: 'foregroundSecondaryHover',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.foregroundSecondary,
      },
      selectors: {
        '&:hover': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundSecondaryHover,
          },
        },
        '&:active': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundSecondaryHover,
          },
        },
      },
    }),
  ]),
  transparent: style([
    atoms({
      color: 'textTertiary',
      backgroundColor: {
        hover: 'foregroundTertiary',
        active: 'foregroundTertiary',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.transparent,
      },
    }),
  ]),
  invisible: style([
    atoms({
      color: 'textTertiary',
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.transparent,
      },
    }),
  ]),
}

export type Variant = keyof typeof variant

const getShapeSizeCompoundVariant = (shape: Shape, size: Size) => ({
  variants: {
    shape,
    size,
  },
  style: style([
    atoms({
      borderRadius:
        shape === 'rounded'
          ? size === 'small'
            ? 'large'
            : '2xLarge'
          : undefined,
    }),
    style({
      padding: 0,
    }),
  ]),
})

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      transitionDuration: '150',
      transitionProperty: 'default',
      transitionTimingFunction: 'inOut',
    }),
    style({
      height: buttonSize,
      boxShadow: `${vars.shadows['0']} ${boxShadowColorVar}`,
      selectors: {
        '&:hover': {
          boxShadow: `${vars.shadows['1']} ${boxShadowColorVar}`,
        },
        '&:active': {
          boxShadow: `${vars.shadows['0.5']} ${boxShadowColorVar}`,
        },
        '&:disabled': {
          backgroundColor: vars.colors.foregroundSecondary,
          color: vars.colors.textTertiary,
          boxShadow: 'none',
        },
      },
    }),
  ]),
  variants: {
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
      false: {},
    },
    center: {
      true: atoms({
        position: 'relative',
      }),
      false: {},
    },
    shape,
    size,
    tone,
    variant,
  },
  compoundVariants: [
    // Shape + Size
    getShapeSizeCompoundVariant('circle', 'large'),
    getShapeSizeCompoundVariant('circle', 'medium'),
    getShapeSizeCompoundVariant('circle', 'small'),
    getShapeSizeCompoundVariant('square', 'large'),
    getShapeSizeCompoundVariant('square', 'medium'),
    getShapeSizeCompoundVariant('square', 'small'),
    // Center + Size
    {
      variants: {
        center: true,
        size: 'large',
      },
      style: atoms({
        paddingX: '14',
      }),
    },
    // background tone
    {
      variants: {
        tone: 'background',
        variant: 'secondary',
      },
      style: style({
        vars: {
          [boxShadowColorVar]: vars.colors.background,
          [vars.colors.accentSecondaryHover]: vars.colors.background,
        },
        backgroundColor: vars.colors.background,
      }),
    },
    {
      variants: {
        center: true,
        size: 'large',
      },
      style: atoms({
        paddingX: '15',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
