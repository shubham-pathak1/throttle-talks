import { create } from 'zustand';
import { ColorScheme, COLORS } from '../constants/theme';

interface ThemeState {
  colorScheme: ColorScheme;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'dark',
  colors: COLORS.dark,
  
  toggleTheme: () =>
    set((state) => {
      const newScheme = state.colorScheme === 'light' ? 'dark' : 'light';
      return {
        colorScheme: newScheme,
        colors: COLORS[newScheme],
      };
    }),
  
  setTheme: (scheme: ColorScheme) =>
    set({
      colorScheme: scheme,
      colors: COLORS[scheme],
    }),
}));


// things i want u to improve:
// the ui/ux on the home page is below average, make it way better polished, its seems a bit immature too, choose better icons
// add an feature to actually add meetups
// user should be able to edit details on garage page
// on profile page when i click on any post it should actually be usable
// the ui ux of profile screen too is below average, make it way better & polished, it seems a bit immature too, choose better icons
// choose better icons for navigation too
// on messages screen, chat should open and actually be accessible
// all search and filter functionalities should work
// share functionality should also work
// also add Onboarding flow - Welcome screens for first-time users 
// Build more screens? (Settings, edit profile, create post, add vehicle forms)
// Add animations? (More microinteractions, smooth transitions)
// after all of this is completed i will check whether there is a need to add something else too, then only we will move to back end alright, and do you think this is the right approach?