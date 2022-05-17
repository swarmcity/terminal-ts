import { Router } from '@reach/router'
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
import { SetupProfile } from './pages/create-account/setup-profile'
import { AccountCreated } from './pages/create-account/created'
import { ChoosePassword } from './pages/create-account/choose-password'
import { Backup } from './pages/create-account/backup'
import { Account } from './pages/account'

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
					<SetupProfile path={ROUTES.CREATE_ACCOUNT} />
					<AccountCreated path={ROUTES.ACCOUNT_CREATED} />
					<ChoosePassword path={ROUTES.ACCOUNT_PASSWORD} />
					<Backup path={ROUTES.ACCOUNT_BACKUP} />
					<Account path={ROUTES.ACCOUNT} />
					<Home path={ROUTES.HOME} />
				</Router>
			</WagmiProvider>
		</>
	)
}
