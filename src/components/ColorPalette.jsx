/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ColorButton from './ColorButton';
import * as CommonTypes from '../helpers/commonTypes';
import useTranslate from '../helpers/useTranslate';

const ColorPalette = ({ size, borderWidth, palette, onSelect, disableAlpha }) => {
  const { t } = useTranslate();
  const handleSelectColor = name => {
    const translatedName = t(name);
    if (onSelect) onSelect(translatedName, palette[name]);
  };

  return (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '8px 0 0 8px' }}>
      {Object.keys(palette).map(name => (
        <ColorButton
          size={size}
          key={`${name}`}
          color={palette[name]}
          className="muicc-palette-button"
          borderWidth={borderWidth}
          tooltip={name}
          disableAlpha={disableAlpha}
          onClick={() => handleSelectColor(name)}
          sx={{ m: '0 8px 8px 0', p: 0 }}
        />
      ))}
    </Box>
  );
};

ColorPalette.propTypes = {
  borderWidth: PropTypes.number,
  size: PropTypes.number,
  palette: CommonTypes.palette.isRequired,
  forwardRef: PropTypes.shape({ current: PropTypes.elementType }),
  onSelect: PropTypes.func,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
};

ColorPalette.defaultProps = {
  borderWidth: 0,
  size: 24,
  forwardRef: undefined,
  onSelect: undefined,
  disableAlpha: false,
};

export default ColorPalette;
