/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { styled } from '@mui/styles';
import * as ColorTool from '../helpers/colorTool';
import * as CommonTypes from '../helpers/commonTypes';
import useTranslate from '../helpers/useTranslate';

const StyledButton = styled(Button)({
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  borderStyle: 'solid',
  borderRadius: 4,
  padding: 0,
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.5)',
  },
});

/**
- Use a ColorButton to select a predefined color by clicking on this button.
- If the color is not valid or transparent a crossed background is displayed.
 */
const ColorButton = ({ color: c, size, borderWidth, borderColor, forwardRef, tooltip, disableAlpha, sx, ...props }) => {
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(c, disableAlpha, t, i18n.language);
  const translated = t(tooltip);
  const cssColor = color.css;
  let l = color.hsl[2] - 10;
  if (l < 30) l = color.hsl[2] + 50;
  const { alpha } = color;
  const hoverColor = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${l}%, ${alpha})`;

  const component = (
    <StyledButton
      data-testid="colorbutton"
      ref={forwardRef}
      variant="contained"
      aria-label={color.name}
      sx={{
        backgroundImage:
          color.error || alpha < 1
            ? `
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%)`
            : 'none',
        backgroundColor: cssColor.backgroundColor || '#fff',
        borderColor: borderColor || '#767676',
        borderWidth: borderWidth || 0,
        width: size,
        minWidth: size,
        height: size,
        '& div': {
          content: '" "',
          background: color.error
            ? `repeating-linear-gradient(
        135deg,
        transparent,
        transparent ${size / 2 + 2}px,
        #f44336 ${size / 2 + 2}px,
        #f44336 ${size / 2 + 4}px
      )`
            : 'none',
          backgroundColor: color.error ? 'transparent' : cssColor.backgroundColor || '#fff',
          width: size,
          minWidth: size,
          height: size,
          border: color.error ? '2px solid #f44336' : `${borderWidth || 0}px solid ${borderColor || '#767676'}`,
          borderRadius: 4,
          padding: 0,
        },
        '&:hover div': {
          backgroundColor: hoverColor,
        },
        ...sx,
      }}
      {...props}
    >
      <div />
    </StyledButton>
  );
  if (tooltip) {
    return (
      <Tooltip title={translated}>
        <Box component="div" sx={{ width: 'min-content' }}>
          {component}
        </Box>
      </Tooltip>
    );
  }
  return component;
};

ColorButton.propTypes = {
  /**
    The color to display, could be a css valid string, an integer, or a Color object see  ColorType
   */
  color: CommonTypes.color.isRequired,
  /**
    The size of the button in pixel
   */
  size: PropTypes.number,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  /**
    The width of the button's border, not displayed if borderWidth=0
   */
  borderWidth: PropTypes.number,
  /**
    The css color of the button's border, not displayed if borderWidth=0
   */
  borderColor: PropTypes.string,
  /**
    A tooltip could be added to the button to display the color name or value
   */
  tooltip: PropTypes.string,
  /**
    Internal usage
   */
  forwardRef: PropTypes.shape({ current: PropTypes.elementType }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

ColorButton.defaultProps = {
  size: 24,
  borderWidth: 0,
  borderColor: undefined,
  forwardRef: undefined,
  tooltip: undefined,
  disableAlpha: false,
  sx: {},
};

export default ColorButton;
