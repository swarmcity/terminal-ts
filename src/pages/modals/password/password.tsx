import { useState } from 'preact/hooks'
import cn from 'classnames'
import { Wallet } from 'ethers'

// Assets
import avatarImage from '../../../assets/imgs/avatar.svg?url'

// Components
import { ButtonRoundArrow } from '../../../components/ButtonRoundArrow'
import { ButtonClose } from '../../../components/ButtonClose'

// Style
import classes from './password.module.css'

// Store
import { useStore } from '../../../store'

// Types
import type { JSXInternal } from 'preact/src/jsx'

type PasswordModalProps = {
	show?: boolean
	onClose: () => void
	onSuccess: (wallet: Wallet) => void
}

export const PasswordModal = ({
	show,
	onClose,
	onSuccess,
}: PasswordModalProps) => {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const [profile] = useStore.profile()

	// TODO: Show error message somewhere
	if (!profile?.encryptedWallet) {
		console.error('No encryptedWallet')
		return null
	}

	const decrypt = async (
		event: JSXInternal.TargetedEvent<HTMLElement, Event>
	) => {
		event.preventDefault()

		setLoading(true)
		try {
			const wallet = await Wallet.fromEncryptedJson(
				profile?.encryptedWallet ?? '',
				password
			)
			onSuccess(wallet)
		} catch (err) {
			// TODO: Show error message somewhere
			// NOTE: Likely invalid password
		} finally {
			setPassword('')
			setLoading(false)
		}
	}

	return (
		<div
			class={cn(classes.passwordModal, 'modal', 'show')}
			tabIndex={-1}
			aria-labelledby="pwModalLabel"
			aria-hidden={show ? 'false' : 'true'}
			style={{ display: show ? 'block' : 'none' }}
		>
			<div class="modal-dialog modal-fullscreen">
				<div class="modal-content">
					<div class="modal-body">
						<div class="bg-info-50 send-password">
							<main class="flex-space">
								<div class="content">
									<figure class="avatar">
										<img src={avatarImage} alt="user avatar" />
									</figure>
									<form onSubmit={decrypt}>
										<input
											type="password"
											placeholder="password?"
											value={password}
											onChange={(event) =>
												setPassword(event.currentTarget.value)
											}
										/>
									</form>
								</div>
								<div class="btns btn-icons">
									<ButtonClose
										variant="dark"
										class="btn-img close"
										onClick={onClose}
										disabled={loading}
									/>
									<ButtonRoundArrow onClick={decrypt} disabled={loading} />
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
