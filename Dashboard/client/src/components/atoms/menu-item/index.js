import React, { forwardRef } from 'react';
import { MenuItem as MI } from '@material-ui/core';

const MenuItem = forwardRef(({ children, ...rest }, ref) => {
  return (
    <MI {...rest} ref={ref}>
      {children}
    </MI>
  );
});

export default MenuItem;
