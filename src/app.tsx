import { Router, Redirect } from '@reach/router'
import { Provider as WagmiProvider } from 'wagmi'
import {
	InfuraProvider,
	InfuraWebSocketProvider,
	BaseProvider,
	WebSocketProvider,
} from '@ethersproject/providers'

// Pages
import { Login } from './pages/login'
import { Home } from './pages/home'
import { CreateAccount } from './pages/create-account/create-account'
import { AccountCreated } from './pages/create-account/created'

import * as ROUTES from './routes'

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
					<Login path={ROUTES.LOGIN} />
					<CreateAccount path={ROUTES.CREATE_ACCOUNT} />
					<AccountCreated path={ROUTES.ACCOUNT_CREATED} />
					<Home path={ROUTES.HOME} />
				</Router>
			</WagmiProvider>
		</>
	)
}
