import React from 'react';
import { Select as S } from '@material-ui/core';

const Select = ({ children, ...rest }, ref) => {
  return <S {...rest}>{children}</S>;
};

export default Select;
