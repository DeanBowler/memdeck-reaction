import * as React from 'react';

import { CardProps } from './Card';
import { FlippinCardProps } from './FlippinCard';
import styled from 'styled-components';

export interface OrderDisplayCardProps extends CardProps, FlippinCardProps {}

const OrderDisplay = styled.div`
  display: flex;

  padding: 5px;
  padding-left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
`;

export const withOrderDisplay = (WrappedComponent: React.ComponentType<CardProps>) =>
  class OrderDisplayCard extends React.Component<OrderDisplayCardProps> {
    render() {
      return (
        <>
          <OrderDisplay>{this.props.model.stackPosition}</OrderDisplay>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
