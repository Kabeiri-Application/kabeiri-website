import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  type AddressSchema,
  type PersonalSchema,
  type ShopSchema,
} from '@/app/flow/schema';

interface OnboardingStore {
  personalInfo: Partial<PersonalSchema>;
  addressInfo: Partial<AddressSchema>;
  shopInfo: Partial<ShopSchema>;
  setPersonalInfo: (data: Partial<PersonalSchema>) => void;
  setAddressInfo: (data: Partial<AddressSchema>) => void;
  setShopInfo: (data: Partial<ShopSchema>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      personalInfo: {},
      addressInfo: {},
      shopInfo: {},
      setPersonalInfo: (data) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...data },
        })),
      setAddressInfo: (data) =>
        set((state) => ({
          addressInfo: { ...state.addressInfo, ...data },
        })),
      setShopInfo: (data) =>
        set((state) => ({
          shopInfo: { ...state.shopInfo, ...data },
        })),
      reset: () =>
        set({
          personalInfo: {},
          addressInfo: {},
          shopInfo: {},
        }),
    }),
    {
      name: 'onboarding-store',
    }
  )
);
