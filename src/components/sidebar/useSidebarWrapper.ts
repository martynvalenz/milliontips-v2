import { getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

const SIDEBAR_COOKIE_NAME = 'sidebar-open';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

interface SidebarWrapperStoreState {
  isSidebarOpen: boolean;
  isExpanded: boolean;
}

interface SidebarWrapperStoreActions {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarWrapper = create<
  SidebarWrapperStoreState & SidebarWrapperStoreActions
>((set, get) => ({
  isSidebarOpen:
    getCookie(SIDEBAR_COOKIE_NAME) === 'true' ||
    getCookie(SIDEBAR_COOKIE_NAME) === undefined,
  isExpanded: false,
  setIsSidebarOpen: (isSidebarOpen: boolean) =>
    set({ isSidebarOpen }),
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
  toggleSidebar: () => {
    const newValue = !get().isSidebarOpen;
    setCookie(SIDEBAR_COOKIE_NAME, newValue, {
      expires: new Date(Date.now() + SIDEBAR_COOKIE_MAX_AGE * 1000),
      path: '/',
    });
    set({ isSidebarOpen: newValue });
  },
}));
