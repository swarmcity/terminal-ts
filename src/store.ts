import createStore from 'teaful'
import { Mnemonic } from 'ethers/lib/utils'

type Profile = {
	username: string
}

type Store = {
	address: string | undefined
	mnemonic: Mnemonic | undefined
	profile: Profile | undefined
	encryptedWallet: string | undefined
}

function setLocalStore(key: string, value?: string) {
	if (value) {
		localStorage.setItem(key, value)
	} else {
		localStorage.removeItem(key)
	}
}

function updateLocalStore(store: Store, prevStore: Store, key: keyof Store) {
	if (store[key] !== prevStore[key]) {
		setLocalStore(key, JSON.stringify(store[key]))
	}
}

function readLocalStore<T>(key: string): T | undefined {
	try {
		const json = localStorage.getItem(key)
		return json ? (JSON.parse(json) as T) : undefined
	} catch (err) {
		return undefined
	}
}

export const { useStore, getStore, withStore } = createStore<Store>(
	{
		address: readLocalStore('address'),
		mnemonic: undefined,
		profile: readLocalStore('profile'),
		encryptedWallet: readLocalStore('encryptedWallet'),
	},
	({ store, prevStore }) => {
		updateLocalStore(store, prevStore, 'encryptedWallet')
		updateLocalStore(store, prevStore, 'profile')
		updateLocalStore(store, prevStore, 'address')
	}
)
