import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    hasSeenOnboarding: boolean;
    user: null | { id: string; name: string };
    login: () => void;
    logout: () => void;
    completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    hasSeenOnboarding: false,
    user: null,
    login: () => set({ isAuthenticated: true, user: { id: '1', name: 'User' } }),
    logout: () => set({ isAuthenticated: false, user: null }),
    completeOnboarding: () => set({ hasSeenOnboarding: true }),
}));
