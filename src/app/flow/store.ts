import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type PersonalSchema, type ShopSchema } from './schema';

interface OnboardingStore {
  personalInfo: Partial<PersonalSchema>;
  shopInfo: Partial<ShopSchema>;
  setPersonalInfo: (data: Partial<PersonalSchema>) => void;
  setShopInfo: (data: Partial<ShopSchema>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      personalInfo: {},
      shopInfo: {},
      setPersonalInfo: (data) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...data },
        })),
      setShopInfo: (data) =>
        set((state) => ({
          shopInfo: { ...state.shopInfo, ...data },
        })),
      reset: () =>
        set({
          personalInfo: {},
          shopInfo: {},
        }),
    }),
    {
      name: 'onboarding-store',
    }
  )
);
