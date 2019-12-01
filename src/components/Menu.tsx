import React from 'react';

import { useTransition, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { darken, transparentize } from 'polished';
import { compose } from 'ramda';

import palette from 'src/style/palette';
import HeaderBrand from './HeaderBrand';

interface MenuProps {
  isOpen: boolean;
  onCloseClick(): void;
}

const colorProcess = compose(darken(0.1), transparentize(0.05));

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  width: 420px;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: linear-gradient(
    ${p => colorProcess(p.theme.background.start)},
    ${p => colorProcess(p.theme.background.end)}
  );
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);

  ${media.lessThan('small')`
    width: 100%;
  `}
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem;

  ${media.lessThan('medium')`
    margin: 1rem;
  `}
`;

const MenuContent = styled.div``;

const AnimatedMenuContainer = animated(MenuContainer);

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  background: transparent;
  opacity: 0.7;
  display: block;
  padding: 1rem 2rem;
  font-size: 2rem;
  color: ${palette.white};
  text-decoration: none;

  :hover {
    opacity: 1;
  }
`;

const NavDescription = styled.div`
  font-size: 1rem;
`;

const MenuHeaderBrandContainer = styled.div`
  visibility: visible;
  ${media.greaterThan('small')`
    visibility: hidden;
  `}
`;

export default function Menu({ isOpen, onCloseClick }: MenuProps) {
  const transitions = useTransition(isOpen, null, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(100%)' },
  });

  const onItemClick = () => onCloseClick();

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedMenuContainer key={key} style={props}>
              <MenuHeader>
                <MenuHeaderBrandContainer>
                  <HeaderBrand />
                </MenuHeaderBrandContainer>
              </MenuHeader>
              <MenuContent>
                <nav>
                  <NavList>
                    <li>
                      <StyledNavLink to="order" onClick={onItemClick}>
                        Deck Order
                        <NavDescription>View all cards in stack order</NavDescription>
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to="whichis" onClick={onItemClick}>
                        Which is test
                        <NavDescription>
                          Test which card is before/after the shown card
                        </NavDescription>
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to="drawfromfan" onClick={onItemClick}>
                        Draw from fan
                        <NavDescription>
                          Draw and divine sequential cards from a fan
                        </NavDescription>
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to="oneshot" onClick={onItemClick}>
                        Oneshot
                        <NavDescription>
                          Draw a number of cards from a random position
                        </NavDescription>
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to="wordrecall" onClick={onItemClick}>
                        Word Recall
                        <NavDescription>
                          Trainer for committing object names to memory
                        </NavDescription>
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to="settings" onClick={onItemClick}>
                        Settings
                        <NavDescription>Tweak settings</NavDescription>
                      </StyledNavLink>
                    </li>
                  </NavList>
                </nav>
              </MenuContent>
            </AnimatedMenuContainer>
          ),
      )}
    </>
  );
}
