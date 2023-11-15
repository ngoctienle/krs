import { create, createJSONStorage, persist } from '@krs/core'
import { KRSPersist } from 'src/common/interface/app'
import { AppLocale, LayoutTheme } from 'src/common/interface/common'
import krsHelper from 'src/utils/helpers'

interface KRSStore {
  persist: KRSPersist
}
interface KRSStoreActionsPersist {
  setPersist: (newPersistState: Partial<KRSPersist>) => void
}
type KRSAction = KRSStoreActionsPersist

// Initial state
const initialKRSStore: KRSStore = {
  persist: {
    ...krsHelper.getGlobalState(),
    app_language: AppLocale.EN,
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? LayoutTheme.Dark
      : LayoutTheme.Light,
    user_id: null,
    token: null,
    refresh_token: null
  }
}

const useKrsStore = create<KRSStore & KRSAction>()(
  persist(
    (set) => ({
      persist: initialKRSStore.persist,
      setPersist: (newPersistState) =>
        set((state) => ({ persist: { ...state.persist, ...newPersistState } }))
    }),
    {
      name: '_krsStorage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useKrsStore
