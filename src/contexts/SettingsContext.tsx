import React, { useCallback, useContext } from 'react';

import { createContext } from 'react';
import { useLocalStorage } from 'react-use';

export type BackgroundTheme = { start: string; end: string };
interface Theme {
  background: BackgroundTheme;
}

export type FaceStyles = 'normal' | 'simple';

interface Settings {
  cardback: string;
  faceStyle: FaceStyles;
  theme: Theme;
}

const INITIAL_SETTINGS: Settings = {
  cardback: 'eye--aubergine',
  faceStyle: 'normal',
  theme: {
    background: {
      start: '#295631',
      end: '#446f44',
    },
  },
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

  const updateSetting = useCallback<UpdateSettingsFunc>(
    key => value => {
      const update = { [key]: value };
      setSettings({ ...settings, ...update });
    },
    [settings, setSettings],
  );

  const contextValue: SettingsContext = {
    settings: { ...INITIAL_SETTINGS, ...settings },
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
