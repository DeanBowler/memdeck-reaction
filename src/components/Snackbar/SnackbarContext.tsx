import React, { useContext } from 'react';

import { createContext, useState } from 'react';
import { filter } from 'ramda';
import styled from 'styled-components';
import Button from '../Button';

interface SnackbarAction {
  text: string;
  action(): void;
}

interface SnackbarMessage {
  text: string;
  closeDelayMs?: number;
  actions?: readonly SnackbarAction[];
}

interface SnackbarContext {
  add: (message: SnackbarMessage) => void;
  remove: (message: SnackbarMessage) => void;
  items: readonly SnackbarMessage[];
}

const INITIAL_CONTEXT: SnackbarContext = {
  add: () => undefined,
  remove: () => undefined,
  items: [],
};

const SnackbarContext = createContext(INITIAL_CONTEXT);

interface SettingContextProviderProps {
  children: React.ReactNode;
}

const SnackbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const SnackItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  background: rgba(20, 20, 20, 0.85);
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border-radius: 5px;
`;

interface SnackItemProps {
  content: SnackbarMessage;
}

const SnackButton = styled(Button)`
  margin-left: 1rem;
`;

function SnackItem({ content }: SnackItemProps) {
  return (
    <SnackItemContainer>
      {content.text}
      <div>
        {content.actions &&
          content.actions.map(a => (
            <SnackButton key={a.text} slim={true} onClick={() => a.action()}>
              {a.text}
            </SnackButton>
          ))}
      </div>
    </SnackItemContainer>
  );
}

export function SnackbarContextProvider({ children }: SettingContextProviderProps) {
  const [items, setItems] = useState<SnackbarMessage[]>([]);

  const remove = (item: SnackbarMessage) => setItems(filter(i => i !== item)(items));
  const add = (item: SnackbarMessage) => {
    setItems([...items, item]);
    if (item.closeDelayMs) setTimeout(() => remove(item), item.closeDelayMs);
  };

  return (
    <SnackbarContext.Provider value={{ add, remove, items }}>
      {children}
      <SnackbarContainer>
        {items.map(snack => (
          <SnackItem key={snack.text} content={snack} />
        ))}
      </SnackbarContainer>
    </SnackbarContext.Provider>
  );
}

const useSnackbarContext = () => useContext(SnackbarContext);

export const useSnackbar = () => {
  const context = useSnackbarContext();
  return { add: context.add };
};
