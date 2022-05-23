import { useState } from 'preact/hooks'
import { Link, Redirect } from '@reach/router'

// Components
import { ButtonClose } from '../../components/ButtonClose'

// Store and routes
import { LOGIN, ACCOUNT, ACCOUNT_PUBLIC_WALLET } from '../../routes'
import { useStore } from '../../store'

// Assets
import cancelButton from '../../assets/imgs/cancel.svg'
import sendButton from '../../assets/imgs/caretNext.svg'

// Types
import type { FunctionComponent } from 'preact'
import type { RouteComponentProps } from '@reach/router'

enum View {
	Menu,
	Send,
	Receive,
}

type ChangeView = {
	setView: (view: View) => void
}

const Menu = ({ setView }: ChangeView) => (
	<div class="flex-space">
		<a onClick={() => setView(View.Send)} class="btn btn-info">
			send DAI
		</a>
		<Link to="/account-public-wallet" className="btn btn-info">
			receive
		</Link>
	</div>
)

const Send = ({ setView }: ChangeView) => (
	<div class="flex-space user-wallet-send">
		<form class="send">
			<div class="input-group">
				<input type="text" id="amt-send" />
				<label for="amt-send">Amount to send</label>
			</div>
			<input type="text" id="rec-address" placeholder="Receiver's address" />
			<div class="btns btn-icons">
				<a class="close" onClick={() => setView(View.Menu)}>
					<img src={cancelButton} />
				</a>
				<a class="btn-icon">
					<img src={sendButton} />
				</a>
			</div>
		</form>
	</div>
)

const Receive = () => null

const VIEWS: Record<View, FunctionComponent<ChangeView>> = {
	[View.Menu]: Menu,
	[View.Send]: Send,
	[View.Receive]: Receive,
}

export const AccountWallet = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()
	const [view, setView] = useState<View>(View.Menu)
	const ViewComponent = VIEWS[view]

	if (!profile) {
		return <Redirect path={LOGIN} />
	}

	return (
		<div class="bg-gray-lt user-wallet">
			<div class="close">
				<ButtonClose href={ACCOUNT} variant="dark" />
			</div>
			<div class="container">
				<div class="flex-space">
					<div class="wallet-balance">
						44 DAI <span class="usd"> ≈ 44 USD</span>
					</div>
					<div>
						<Link to={ACCOUNT_PUBLIC_WALLET} className="link link-dark">
							show my keys
						</Link>
					</div>
				</div>
			</div>
			<div class="divider short" />
			<div class="container">
				<ViewComponent setView={setView} />
			</div>
			<div class="divider short" />
			<div class="container">
				<div class="flex-space">
					<div class="history">
						<div class="history-item">
							<div class="date">13 Jan 2022 - 22:33</div>
							<div class="tx-amt">Received 7 DAI from 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
						<div class="history-item">
							<div class="date">09 Jan 2022 - 22:33</div>
							<div class="tx-amt">Sent 18 DAI to 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
						<div class="history-item">
							<div class="date">01 Dec 2021 - 19:03</div>
							<div class="tx-amt">Received 7 DAI from 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
