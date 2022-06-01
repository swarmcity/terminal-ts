import { useState } from 'preact/hooks'
import { Link, navigate, Redirect, Router } from '@reach/router'
import { useBalance, useSendTransaction } from 'wagmi'
import { getAddress } from '@ethersproject/address'
import { parseEther } from '@ethersproject/units'

// Components
import { ButtonClose } from '../../components/ButtonClose'
import { Input } from '../../components/input/input'

// Store and routes
import { useStore } from '../../store'
import {
	LOGIN,
	ACCOUNT,
	ACCOUNT_PUBLIC_WALLET,
	ACCOUNT_WALLET_SEND,
	ACCOUNT_WALLET,
} from '../../routes'

// Assets
import cancelButton from '../../assets/imgs/cancel.svg'
import sendButton from '../../assets/imgs/caretNext.svg'

// Types
import type { RouteComponentProps } from '@reach/router'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'

const Menu = (_: RouteComponentProps) => (
	<div class="flex-space">
		<Link to={ACCOUNT_WALLET_SEND} className="btn btn-info">
			send DAI
		</Link>
		<Link to={ACCOUNT_PUBLIC_WALLET} className="btn btn-info">
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

const Send = (_: RouteComponentProps) => {
	const [amount, setAmount] = useState('0')
	const [address, setAddress] = useState('')
	const { to, value, isValid } = formatRequest({ amount, address })

	const { isLoading, isError, error, sendTransaction } = useSendTransaction({
		request: { to, value },
		onSuccess: () => navigate(ACCOUNT_WALLET),
	})

	const submit = () => {
		if (isValid) {
			sendTransaction()
		}
	}

	return (
		<div class="flex-space user-wallet-send">
			<form class="send" onSubmit={submit}>
				<Input
					id="amt-send"
					type="number"
					min={0}
					onChange={(event) => setAmount(event.currentTarget.value)}
				>
					Amount to send
				</Input>
				<Input
					id="rec-address"
					type="text"
					min={0}
					onChange={(event) => setAddress(event.currentTarget.value)}
				>
					Receiver's address
				</Input>

				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				{isError && (error as any).reason}
				{isLoading && 'Loading...'}
				{!isValid && amount && address && 'Form invalid'}

				<div class="btns btn-icons">
					<Link to={ACCOUNT_WALLET} className="close">
						<img src={cancelButton} />
					</Link>
					<ButtonRoundArrow type="submit" className="btn-icon" onClick={submit}>
						<img src={sendButton} />
					</ButtonRoundArrow>
				</div>
			</form>
		</div>
	)
}

export const AccountWallet = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()
	const { data: balance } = useBalance()

	if (!profile?.address) {
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
				<Router>
					<Send path="/send" />
					<Menu default />
				</Router>
			</div>
		</div>
	)
}
