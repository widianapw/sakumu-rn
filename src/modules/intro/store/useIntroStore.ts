import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IntroState {
  showIntro: boolean;
  setShowIntro: (showIntro: boolean) => void;
}

const useIntroStore = create<IntroState>()(
  persist(
    (set, get) => ({
      showIntro: false,
      setShowIntro: (showIntro: boolean) => set({showIntro}),
    }),
    {
      name: 'intro-store',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default useIntroStore;
