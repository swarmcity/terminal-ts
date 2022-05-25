import type { Chain } from 'wagmi'
import type { Networkish } from '@ethersproject/networks'

const BLOCK_EXPLORER = {
	name: 'BlockScount',
	url: 'https://blockscout.com/xdai/mainnet/',
}

export const WAGMI_CHAIN: Chain = {
	id: 100,
	name: 'Gnosis Chain',
	network: 'Gnosis Chain',
	nativeCurrency: {
		name: 'xDAI',
		symbol: 'xDAI',
		decimals: 18,
	},
	rpcUrls: {
		websocket: 'wss://rpc.gnosischain.com/wss',
		default: 'https://rpc.ankr.com/gnosis',
	},
	blockExplorers: {
		etherscan: BLOCK_EXPLORER,
		default: BLOCK_EXPLORER,
	},
}

export const WAGMI_NETWORK: Networkish = {
	chainId: WAGMI_CHAIN.id,
	name: WAGMI_CHAIN.name,
}