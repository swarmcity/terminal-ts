// Components
import { Cropper, CropperRef } from '../../components/cropper'

// Lib
import { blobToDataURL } from '../../lib/canvas'
import { useStore } from '../../store'
import avatarDefault from '../../assets/imgs/avatar.svg?url'
import arrowUp from '../../assets/imgs/arrowUp.svg?url'
import { useState, useRef } from 'preact/hooks'
import { ACCOUNT_CREATED } from '../../routes'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'
import { ButtonClose } from '../../components/ButtonClose'

const STATES = ['username', 'passwordWarning', 'password'] as const
export type State = typeof STATES[number]

export const SetupProfile = () => {
	const [profile, setProfile] = useStore.profile()
	const [step, setStep] = useState<State>('username')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')
	const cropperRef = useRef<CropperRef>(null)
	const [cropper, setCropper] = useState(false)
	const [avatar, setAvatar] = useState<string>(avatarDefault)
	const [blob, setBlob] = useState<Blob>()

	const updateAvatar = async () => {
		if (!cropperRef.current) {
			throw new Error('cropperRef not set')
		}

		try {
			const blob = await cropperRef.current?.getImage()

			setBlob(blob)
			setAvatar(URL.createObjectURL(blob))
			setCropper(false)
		} catch (err) {
			console.error(err)
		}
	}

	const onChange = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		setProfile({ username: currentTarget.value })
	}

	// TODO: Type the file change event
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFileChange = async (event: any) => {
		if (!(event.target instanceof HTMLInputElement)) {
			return
		}

		if (event.target.files?.length) {
			const file = event.target.files[0]
			setAvatar(await blobToDataURL(file))
		}
	}

	if (cropper) {
		return (
			<>
				<h1 class="text-3xl mb-8">Choose an avatar.</h1>
				<div class="form-control">
					<Cropper ref={cropperRef} wrapperClass="mb-8" image={avatar} />
				</div>
				<label class="mb-4 block cursor-pointer underline decoration-dotted">
					<input
						type="file"
						onChange={onFileChange}
						accept="image/*"
						class="hidden"
					/>
					choose another file
				</label>
				<button class="btn mr-4" onClick={() => setCropper(false)}>
					Cancel
				</button>
				<button class="btn" onClick={() => updateAvatar()}>
					Next
				</button>
			</>
		)
	}

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
							<figure class="avatar">
								<a href="user-create-avatar.html">
									<img src={avatar} alt="user avatar" />
								</a>
								<a
									class="btn-icon btn-info btn-upload"
									href="user-create-avatar.html"
								>
									<img src={arrowUp} />
								</a>
							</figure>
							<form>
								<label for="username" class="form-label">
									Username
								</label>
								<input type="text" id="username" onChange={onChange} />
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
