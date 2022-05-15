import { useStore } from '../../store'
import avatarDefault from '../../assets/imgs/avatar.svg?url'
import arrowUp from '../../assets/imgs/arrowUp.svg?url'
import { useState } from 'preact/hooks'
import { ACCOUNT_CREATED, CREATE_AVATAR } from '../../routes'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'
import { ButtonClose } from '../../components/ButtonClose'

const STATES = ['username', 'passwordWarning', 'password'] as const
export type State = typeof STATES[number]

export const SetupProfile = () => {
	const [profile, setProfile] = useStore.profile()
	const [step, setStep] = useState<State>('username')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')

	if (step === 'username')
		return (
			<div class="bg-gray-lt choose-username">
				<div class="close">
					<ButtonClose />
				</div>
				<div class="container">
					<main class="flex-space">
						<header>
							<h1>Choose a username and an avatar.</h1>
						</header>
						<div class="content">
							<a href={CREATE_AVATAR}>
								<figure class="avatar">
									<img
										src={profile?.avatar || avatarDefault}
										alt="user avatar"
									/>
									<a class="btn-icon btn-info btn-upload" href={CREATE_AVATAR}>
										<img src={arrowUp} />
									</a>
								</figure>
							</a>
							<form>
								<label for="username" class="form-label">
									Username
								</label>
								<input
									type="text"
									id="username"
									onChange={(e) =>
										setProfile({ ...profile, username: e.currentTarget.value })
									}
								/>
							</form>
						</div>
						<div class="btns">
							<ButtonRoundArrow
								disabled={!profile?.username}
								onClick={() => setStep('passwordWarning')}
							/>
						</div>
					</main>
				</div>
			</div>
		)
	else if (step === 'passwordWarning')
		return (
			<div class="bg-gray-lt password-warning">
				<div class="close">
					<ButtonClose />
				</div>
				<div class="container">
					<main class="flex-space">
						<header>
							<h1>Choose a password.</h1>
						</header>
						<div class="warning-box">
							<img src="assets/imgs/warningBlue.svg" />
							<div>
								<p>There is no password recovery available in Swarm City.</p>
								<p>Choose your password with care.</p>
							</div>
						</div>
						<div class="btns">
							<ButtonRoundArrow
								disabled={!profile?.username}
								onClick={() => setStep('password')}
							/>
						</div>
					</main>
				</div>
			</div>
		)
	else if (step === 'password')
		return (
			<div class="bg-gray-lt choose-password">
				<div class="close">
					<ButtonClose />
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
						<div class="btns">
							<ButtonRoundArrow
								disabled={password !== password2}
								href={ACCOUNT_CREATED}
							/>
						</div>
					</main>
				</div>
			</div>
		)

	return null
}
