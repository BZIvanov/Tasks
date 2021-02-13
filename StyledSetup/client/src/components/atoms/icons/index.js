import styled from 'styled-components';
import { Factory } from '@styled-icons/boxicons-solid';

export const FactoryIcon = styled(Factory)`
  color: ${(props) =>
    props.themeColor ? props.theme.palette[props.themeColor] : props.color};
`;
