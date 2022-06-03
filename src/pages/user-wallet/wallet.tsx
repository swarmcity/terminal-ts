import { useState } from 'preact/hooks'
import { Link, navigate, Redirect, Router } from '@reach/router'
import { useAccount, useBalance, useNetwork, useSendTransaction } from 'wagmi'
import { getAddress } from '@ethersproject/address'
import { parseEther } from '@ethersproject/units'

// Components
import { ButtonClose } from '../../components/ButtonClose'
import { Input } from '../../components/input/input'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'

// Lib
import { formatBalance } from '../../lib/tools'

// Store and routes
import { useStore } from '../../store'
import {
	LOGIN,
	ACCOUNT,
	ACCOUNT_PUBLIC_WALLET,
	ACCOUNT_WALLET_SEND,
	ACCOUNT_WALLET,
} from '../../routes'

// Types
import type { RouteComponentProps } from '@reach/router'

const Menu = (_: RouteComponentProps) => {
	const { activeChain } = useNetwork()
	const symbol = activeChain?.nativeCurrency?.symbol

	return (
		<div class="flex-space">
			<Link to={ACCOUNT_WALLET_SEND} className="btn btn-info">
				send {symbol}
			</Link>
			<Link to={ACCOUNT_PUBLIC_WALLET} className="btn btn-info">
				receive
			</Link>
		</div>
	)
}

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
					<ButtonClose to={ACCOUNT_WALLET} className="close" />
					<ButtonRoundArrow
						type="submit"
						className="btn-icon"
						onClick={submit}
					/>
				</div>
			</form>
		</div>
	)
}

export const AccountWallet = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()

	const { activeChain } = useNetwork()
	const symbol = activeChain?.nativeCurrency?.symbol

	const { data: account } = useAccount()
	const { data: balance } = useBalance({
		addressOrName: account?.address,
		watch: true,
	})

	if (!profile?.address) {
		return <Redirect to={LOGIN} noThrow />
	}

	return (
		<div class="bg-gray-lt user-wallet">
			<div class="close">
				<ButtonClose to={ACCOUNT} variant="dark" />
			</div>
			<div class="container">
				<div class="flex-space">
					<div class="wallet-balance">
						{balance ? (
							<>
								{formatBalance(balance)}{' '}
								<span class="usd"> ≈ {balance.formatted} USD</span>
							</>
						) : (
							<>
								0.00 {symbol} <span class="usd"> ≈ 0.0 USD</span>
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
