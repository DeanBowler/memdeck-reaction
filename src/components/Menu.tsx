import React from 'react';

import { useTransition, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { darken, transparentize, shade } from 'polished';
import { pipe } from 'ramda';

import palette from 'src/style/palette';
import HeaderBrand from './HeaderBrand';

interface MenuProps {
  isOpen: boolean;
  onCloseClick(): void;
}

const colorProcess = pipe(shade(0.25), darken(0.05), transparentize(0.1));

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
  bottom: 0;
  overflow: auto;

  :after {
    content: '';
    background: linear-gradient(
        ${p => colorProcess(p.theme.background.start)},
        ${p => colorProcess(p.theme.background.end)}
      ),
      url(/images/backgrounds/felt--lowq.jpg);
    opacity: 0.925;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  ${media.greaterThan('small')`
    width: 420px;
  `}
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 1rem;

  ${media.greaterThan('medium')`
    margin: 1rem 2rem;
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
  display: block;
  padding: 1rem 2rem;
  font-size: 2rem;
  background: rgba(255, 255, 255, 0);
  opacity: 0.7;
  color: ${palette.white};
  text-decoration: none;
  transition: background 250ms ease-in-out;

  :hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
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
