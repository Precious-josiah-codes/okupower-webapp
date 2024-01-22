import { create } from "zustand";

export const useUIStore = create((set, get) => ({
  sideMenu: false,
  dashboardLoader: true,
}));

export const toggleSideMenu = () => {
  useUIStore.setState((state) => ({
    sideMenu: !state.sideMenu,
  }));
  console.log("helo", useUIStore.getState().sideMenu);
};

export const toggleDashoardLoader = (value) => {
  useUIStore.setState({ dashboardLoader: value });
};
