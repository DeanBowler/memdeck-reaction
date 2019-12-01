import React, { useCallback, useContext } from 'react';

import { createContext } from 'react';
import { useLocalStorage } from 'react-use';

interface Settings {
  cardback: string;
}

const INITIAL_SETTINGS: Settings = {
  cardback: 'eye--aubergine',
};

type UpdateSettingsFunc = <K extends keyof Settings>(
  key: K,
) => (value: Settings[K]) => void;

interface SettingsContext {
  settings: Settings;
  updateSetting: UpdateSettingsFunc;
}

const INITIAL_CONTEXT: SettingsContext = {
  settings: INITIAL_SETTINGS,
  updateSetting: () => () => undefined,
};

const SettingsContext = createContext<SettingsContext>(INITIAL_CONTEXT);

interface SettingContextProviderProps {
  children: React.ReactNode;
}

export default function SettingsContextProvider({
  children,
}: SettingContextProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', INITIAL_SETTINGS);

  // const updateSettings = <K extends keyof Settings>(key: K) => (value: Settings[K]) => {
  //   const update = { [key]: value };
  //   setSettings({ ...settings, ...update });
  //   //}), [settings, setSettings]);
  // };

  const updateSetting = useCallback<UpdateSettingsFunc>(
    key => value => {
      const update = { [key]: value };
      setSettings({ ...settings, ...update });
    },
    [settings, setSettings],
  );

  const contextValue: SettingsContext = {
    settings,
    updateSetting,
  };

  return (
    <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
  );
}

const useSettingsContext = () => useContext(SettingsContext);

export function useSetting<K extends keyof Settings>(
  key: K,
): [Settings[K], (value: Settings[K]) => void] {
  const context = useSettingsContext();
  return [context.settings[key], context.updateSetting(key)];
}
