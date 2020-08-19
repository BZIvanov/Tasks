import React from 'react';
import { default as RFS } from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { COUNTRIES } from '../../../constants';

const ReactFlagsSelect = (props) => {
  return <RFS defaultCountry={COUNTRIES[0]} countries={COUNTRIES} {...props} />;
};

export default ReactFlagsSelect;
