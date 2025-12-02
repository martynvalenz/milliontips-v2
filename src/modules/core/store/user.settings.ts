import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { logger } from './logger.middleware';

export interface UserSettingsState {
  activeCaps: boolean;
  threeDigitsLada: boolean;
  patientsView: 'list' | 'details';
  sidebarToggle: boolean;
}

export interface UserSettingsActions {
  setActiveCaps: (value: boolean) => void;
  setThreeDigitsLada: (value: boolean) => void;
  setPatientsView: (value: 'list' | 'details') => void;
  setSidebarToggle: (value: boolean) => void;
}

const userSettingsApi: StateCreator<
  UserSettingsState & UserSettingsActions,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  activeCaps: false,
  threeDigitsLada: false,
  patientsView: 'list',
  sidebarToggle: false,
  setActiveCaps: (value) => set({ activeCaps: value }),
  setThreeDigitsLada: (value) => set({ threeDigitsLada: value }),
  setPatientsView: (value) => set({ patientsView: value }),
  setSidebarToggle: (value) => set({ sidebarToggle: value }),
});

export const useUserSettings = create<
  UserSettingsState & UserSettingsActions
>()(
  logger(
    devtools(persist(userSettingsApi, { name: 'user-settings' }))
  )
);
