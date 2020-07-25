import React from 'react';
import { default as RFS } from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

const ReactFlagsSelect = ({ props }) => {
  return (
    <RFS
      {...props}
      defaultCountry="GB"
      countries={[
        'BG',
        'GB',
        'ES',
        'FR',
        'DE',
        'IT',
        'NL',
        'NO',
        'SE',
        'BE',
        'RO',
      ]}
    />
  );
};

export default ReactFlagsSelect;
