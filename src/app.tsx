import { Router, Redirect } from '@reach/router'
import { Provider as WagmiProvider } from 'wagmi'
import {
	InfuraProvider,
	InfuraWebSocketProvider,
} from '@ethersproject/providers'
import type { BaseProvider, WebSocketProvider } from '@ethersproject/providers'

// Pages
import { LoginPage } from './pages/login'

// Wagmi config
// TODO: Move this to env variable or config file
const infuraId = '7d41a9e494734b098a15c2da59724cd9'
const provider = ({ chainId }: { chainId?: number }): BaseProvider =>
	new InfuraProvider(chainId, infuraId)

// TODO: Move this to library file
const webSocketProvider = ({
	chainId,
}: {
	chainId?: number
}): WebSocketProvider => new InfuraWebSocketProvider(chainId, infuraId)

export function App() {
	return (
		<>
			<WagmiProvider provider={provider} webSocketProvider={webSocketProvider}>
				<Router>
					<Redirect from="/" to="/login" noThrow />
					<LoginPage path="/login/*" />
				</Router>
			</WagmiProvider>
		</>
	)
}
