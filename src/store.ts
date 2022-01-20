import createStore from 'teaful'
import { Mnemonic } from 'ethers/lib/utils'

type Profile = {
	username: string
}

type Store = {
	address: string
	mnemonic: Mnemonic
	profile: Profile
}

export const { useStore, getStore, withStore } = createStore<Store>()
