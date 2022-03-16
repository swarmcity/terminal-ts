import { useState } from 'preact/hooks'
import cn from 'classnames'

// Types
import type { Wallet } from 'ethers'

// Icons
import { ExclamationIcon } from '../../icons/exclamation'

type ChoosePasswordProps = {
	wallet: Wallet
	onNext: (encryptedWallet: string) => void
}

export const ChoosePassword = ({ wallet, onNext }: ChoosePasswordProps) => {
	const { mnemonic } = wallet
	const [showPrompt, setShowPrompt] = useState(true)
	const [loading, setLoading] = useState(false)
	const [passwords, setPasswords] = useState<[string, string]>(['', ''])
	const changePassword = (
		index: number,
		{ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>
	) => {
		const copy = [...passwords] as [string, string]
		copy[index] = currentTarget.value
		setPasswords(copy)
	}

	if (!mnemonic) {
		return <div>Error: no mnemonic</div>
	}

	const passwordsFilledIn = passwords[0].length > 0 && passwords[1].length > 0
	const passwordValid = passwords[0].length > 0 && passwords[0] === passwords[1]
	const canNext = showPrompt || passwordValid

	const goNext = async () => {
		if (showPrompt) {
			setShowPrompt(false)
			return
		}

		if (!canNext || !mnemonic || loading) {
			return
		}

		setLoading(true)
		onNext(await wallet.encrypt(passwords[0]))
		setLoading(false)
	}

	return (
		<div class="flex flex-col">
			<h1 class="text-3xl mb-8">Choose a password.</h1>
			{showPrompt ? (
				<div class="w-full indicator mb-8 mt-6">
					<div class="indicator-item indicator-top indicator-center badge h-12">
						<ExclamationIcon class="w-8 h-8 " />
					</div>
					<div class="card shadow place-items-center">
						<div class="card-body bg-base-300 font-bold">
							<div class="pt-2">
								<p class="mb-4">
									There is no password recovery available in Swarm City.
								</p>
								<p>Choose your password with care.</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<div class="form-control mb-4">
						<input
							type="password"
							class={cn(
								'input',
								'input-bordered',
								passwordsFilledIn && !passwordValid && 'input-error'
							)}
							placeholder="Password"
							onChange={(event) => changePassword(0, event)}
						/>
					</div>
					<div class="form-control mb-4">
						<input
							type="password"
							class={cn(
								'input',
								'input-bordered',
								passwordsFilledIn && !passwordValid && 'input-error'
							)}
							placeholder="Confirm password"
							onChange={(event) => changePassword(1, event)}
						/>
					</div>
					<p class="mb-4">
						{passwordsFilledIn && !passwordValid ? (
							'Password mismatch'
						) : (
							<>&nbsp;</>
						)}
					</p>
				</>
			)}
			<button
				class={cn('btn w-min place-self-center', loading && 'loading')}
				onClick={goNext}
				disabled={!canNext || loading}
			>
				Next
			</button>
		</div>
	)
}
