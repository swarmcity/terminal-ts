import { useState } from 'preact/hooks'
import { Link, Redirect } from '@reach/router'
import { useBalance, useSendTransaction } from 'wagmi'
import { getAddress } from '@ethersproject/address'
import { parseEther } from '@ethersproject/units'

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

const formatRequest = ({
	address,
	amount,
}: {
	address: string
	amount: string
}) => {
	let to, value
	let isValid = true

	try {
		to = getAddress(address)
		value = parseEther(amount)
	} catch (_) {
		isValid = false
	}

	return { to, value, isValid }
}

const Send = ({ setView }: ChangeView) => {
	const [amount, setAmount] = useState('0')
	const [address, setAddress] = useState('')
	const { to, value, isValid } = formatRequest({ amount, address })

	const { isLoading, isError, error, sendTransaction } = useSendTransaction({
		request: { to, value },
		onSuccess: () => setView(View.Menu),
	})

	const submit = () => {
		if (isValid) {
			sendTransaction()
		}
	}

	return (
		<div class="flex-space user-wallet-send">
			<form class="send" onSubmit={submit}>
				<div class="input-group">
					<input
						id="amt-send"
						type="number"
						min={0}
						onChange={(event) => setAmount(event.currentTarget.value)}
						required
					/>
					<label for="amt-send">Amount to send</label>
				</div>
				<div class="input-group">
					<input
						id="rec-address"
						type="text"
						onChange={(event) => setAddress(event.currentTarget.value)}
						required
					/>
					<label for="rec-address">Receiver's address</label>
				</div>

				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				{isError && (error as any).reason}
				{isLoading && 'Loading...'}
				{!isValid && amount && address && 'Form invalid'}

				<div class="btns btn-icons">
					<a
						class="close"
						style={{ cursor: 'pointer' }}
						onClick={() => setView(View.Menu)}
					>
						<img src={cancelButton} />
					</a>
					<a role="button" type="submit" class="btn-icon" onClick={submit}>
						<img src={sendButton} />
					</a>
				</div>
			</form>
		</div>
	)
}

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
	const { data: balance } = useBalance()

	if (!profile) {
		return <Redirect to={LOGIN} noThrow />
	}

	return (
		<div class="bg-gray-lt user-wallet">
			<div class="close">
				<ButtonClose href={ACCOUNT} variant="dark" />
			</div>
			<div class="container">
				<div class="flex-space">
					<div class="wallet-balance">
						{balance ? (
							<>
								{balance.formatted} {balance.symbol}{' '}
								<span class="usd"> ≈ {balance.formatted} USD</span>
							</>
						) : (
							<>
								0.0 xDAI <span class="usd"> ≈ 0.0 USD</span>
							</>
						)}
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
