import { useState } from 'preact/hooks'
import warningBlue from '../../assets/imgs/warningBlue.svg?url'
import { ACCOUNT_CREATED } from '../../routes'
import { navigate, RouteComponentProps } from '@reach/router'
import { Wallet } from 'ethers'
import { UserCreateStop } from '../modals/user-create-stop'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'
import { useStore } from '../../store'

type Props = RouteComponentProps

export const ChoosePassword = (_: Props) => {
	const [showPrompt, setShowPrompt] = useState(true)
	const [profile, setProfile] = useStore.profile()
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')

	const onClick = () => {
		setLoading(true)
		const wallet = Wallet.createRandom()
		wallet.encrypt(password).then((encryptedWallet) => {
			setProfile({
				...profile,
				encryptedWallet,
				address: wallet.address,
			})
			setLoading(false)
			navigate(ACCOUNT_CREATED)
		})
	}

	if (showPrompt)
		return (
			<div class="bg-gray-lt password-warning">
				<div class="close">
					<UserCreateStop />
				</div>
				<div class="container">
					<main class="flex-space">
						<header>
							<h1>Choose a password.</h1>
						</header>
						<div class="warning-box">
							<img src={warningBlue} />
							<div>
								<p>There is no password recovery available in Swarm City.</p>
								<p>Choose your password with care.</p>
							</div>
						</div>
						<div class="btns">
							<ButtonRoundArrow onClick={() => setShowPrompt(false)} />
						</div>
					</main>
				</div>
			</div>
		)
	return (
		<div class="bg-gray-lt choose-password">
			<div class="close">
				<UserCreateStop />
			</div>
			<div class="container">
				<main class="flex-space">
					<header>
						<h1>Choose a password.</h1>
					</header>
					<form>
						<input
							type="password"
							id="password"
							placeholder="password"
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<input
							type="password"
							id="passwordConfirm"
							placeholder="confirm password"
							onChange={(e) => setPassword2(e.currentTarget.value)}
						/>
					</form>
					<p class="error">{password !== password2 && 'Password mismatch'}</p>
					<p>{loading && 'Encrypting...'}</p>
					<div class="btns">
						<ButtonRoundArrow
							disabled={password !== password2 || loading}
							onClick={onClick}
						/>
					</div>
				</main>
			</div>
		</div>
	)
}
