import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  AddressSchema,
  PersonalSchema,
  ShopSchema,
} from '@/app/onboarding/schema';

interface OnboardingStore {
  personalInfo: PersonalSchema;
  addressInfo: AddressSchema;
  shopInfo: ShopSchema;
  setPersonalInfo: (info: PersonalSchema) => void;
  setAddressInfo: (info: AddressSchema) => void;
  setShopInfo: (info: ShopSchema) => void;
  reset: () => void;
}

const initialState = {
  personalInfo: {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    avatarUrl: '',
  },
  addressInfo: {
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shopInfo: {
    shopName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
  },
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPersonalInfo: (info) => set({ personalInfo: info }),
      setAddressInfo: (info) => set({ addressInfo: info }),
      setShopInfo: (info) => set({ shopInfo: info }),
      reset: () => set(initialState),
    }),
    {
      name: 'onboarding-store',
    }
  )
);
