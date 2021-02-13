import React from 'react';
import styled from 'styled-components';

const HeadingOne = styled.h1`
  font-size: 2.5rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;
const HeadingTwo = styled.h2`
  font-size: 2.2rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;
const HeadingThree = styled.h3`
  font-size: 1.8rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;
const HeadingFour = styled.h4`
  font-size: 1.6rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;
const HeadingFive = styled.h5`
  font-size: 1.4rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;
const HeadingSix = styled.h6`
  font-size: 1.2rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.a};
`;

const Heading = ({ variant, children }) => {
  switch (variant) {
    case 'h1':
      return <HeadingOne>{children}</HeadingOne>;
    case 'h2':
      return <HeadingTwo>{children}</HeadingTwo>;
    case 'h3':
      return <HeadingThree>{children}</HeadingThree>;
    case 'h4':
      return <HeadingFour>{children}</HeadingFour>;
    case 'h5':
      return <HeadingFive>{children}</HeadingFive>;
    case 'h6':
      return <HeadingSix>{children}</HeadingSix>;
    default:
      return <HeadingOne>{children}</HeadingOne>;
  }
};

export default Heading;
