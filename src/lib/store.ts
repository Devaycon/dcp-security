import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConsentSetting {
  id: string
  category: string
  description: string
  enabled: boolean
}

interface ConsentStore {
  settings: ConsentSetting[]
  toggleConsent: (id: string) => void
  updateSettings: (settings: ConsentSetting[]) => void
}

export const useConsentStore = create<ConsentStore>()(
  persist(
    (set) => ({
      settings: [],
      toggleConsent: (id: string) => {
        set((state) => ({
          settings: state.settings.map((setting) =>
            setting.id === id
              ? { ...setting, enabled: !setting.enabled }
              : setting
          ),
        }))
      },
      updateSettings: (settings: ConsentSetting[]) => {
        set({ settings })
      },
    }),
    {
      name: 'consent-settings',
    }
  )
) 