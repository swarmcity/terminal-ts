import { useMemo, useState } from 'preact/hooks'
import { Link, Router, useNavigate } from '@reach/router'
import { Wallet } from 'ethers'
import cn from 'classnames'

// Types
import type { ComponentChildren } from 'preact'
import type { RouteComponentProps } from '@reach/router'

// Lib
import { useStore } from '../store'
import { shuffle } from '../lib/tools'

// Icons
import { ExclamationIcon } from '../icons/exclamation'

type WrapperProps = {
	children: ComponentChildren
}

const Wrapper = ({ children }: WrapperProps) => (
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="max-w-sm text-center">{children}</div>
	</div>
)

type LoginProps = RouteComponentProps

const Login = (_: LoginProps) => (
	<>
		<h1 class="text-3xl mb-4">Let's create an account.</h1>
		<p class="mb-16">
			No account was found on this device. When you restore or create a new
			account, it is stored locally on your device.
		</p>
		<div class="flex flex-col">
			<Link to="/login/create" className="btn mb-2">
				Create account
			</Link>
			<button class="btn">Restore account</button>
		</div>
	</>
)

type CreateAccountProps = RouteComponentProps

const CreateAccount = (_: CreateAccountProps) => {
	// Global store
	const [, setAddress] = useStore.address()
	const [, setMnemonic] = useStore.mnemonic()

	// Generate mnemonic and words
	const { address, mnemonic } = useMemo(() => Wallet.createRandom(), [])
	const words = mnemonic.phrase.split(' ')
	const lists = [words.slice(0, 6), words.slice(6)]

	const navigate = useNavigate()
	const onNext = () => {
		setAddress(address)
		setMnemonic(mnemonic)
		navigate('/login/confirm-words')
	}

	return (
		<>
			<h1 class="text-3xl mb-8">Write down these 12 words.</h1>
			<div class="flex place-content-stretch mb-8">
				{lists.map((words, index) => (
					<div class="grow">
						<ol
							class="list-decimal w-min mx-auto text-left"
							start={1 + 6 * index}
						>
							{words.map((word) => (
								<li>{word}</li>
							))}
						</ol>
					</div>
				))}
			</div>
			<button class="btn" onClick={onNext}>
				Next
			</button>
		</>
	)
}

type ConfirmWordInputProps = {
	number: number
	word: string
	onChange: (correct: boolean) => void
}

const ConfirmWordInput = ({
	number,
	word,
	onChange,
}: ConfirmWordInputProps) => {
	const [correct, setCorrect] = useState<boolean | null>(null)
	const checkWord = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		const correct = currentTarget.value === word
		setCorrect(correct)
		onChange(correct)
	}

	return (
		<div class="form-control mb-4">
			<input
				type="text"
				class={cn(
					'input',
					'input-bordered',
					correct === true && 'input-success',
					correct === false && 'input-error'
				)}
				placeholder={`Word ${number}`}
				onChange={checkWord}
			/>
		</div>
	)
}

type ConfirmWordsProps = RouteComponentProps

const ConfirmWords = (_: ConfirmWordsProps) => {
	const [mnemonic] = useStore.mnemonic()
	const confirmWords = useMemo(() => {
		if (!mnemonic) {
			return
		}

		const words = mnemonic?.phrase.split(' ')
		const mappedWords = words.map((word, index) => ({
			word,
			number: index + 1,
		}))

		return shuffle(mappedWords).slice(0, 4)
	}, [mnemonic])

	const [valid, setValid] = useState<boolean[]>([])
	const setCorrect = (index: number, correct: boolean) => {
		const copy = [...valid]
		copy[index] = correct
		setValid(copy)
	}

	const canNext =
		confirmWords?.length &&
		valid.length === confirmWords.length &&
		valid.every((element) => !!element)

	const navigate = useNavigate()
	const onNext = () => {
		if (!canNext) {
			return
		}

		navigate('/login/setup-profile')
	}

	if (!confirmWords) {
		return <div>Error: no mnemonic</div>
	}

	return (
		<>
			<h1 class="text-3xl mb-8">Fill in the correct words.</h1>
			<Link to="/login/create" className="mb-8 underline inline-block">
				I did not write down the words
			</Link>
			{confirmWords.map(({ word, number }, index) => (
				<ConfirmWordInput
					word={word}
					number={number}
					onChange={(correct) => setCorrect(index, correct)}
				/>
			))}
			<button class="btn" onClick={onNext} disabled={!canNext}>
				Next
			</button>
		</>
	)
}

type SetupProfileProps = RouteComponentProps

// TODO: Implement avatar upload
const SetupProfile = (_: SetupProfileProps) => {
	const [username, setUsername] = useState<string>()
	const onChange = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		setUsername(currentTarget.value)
	}

	const [, setProfile] = useStore.profile()
	const navigate = useNavigate()
	const onNext = () => {
		if (!username) {
			return
		}

		setProfile({ username })
		navigate('/login/choose-password')
	}

	return (
		<>
			<h1 class="text-3xl mb-8">Choose a username and an avatar.</h1>
			<div class="form-control mb-4">
				<input
					type="text"
					class="input input-bordered"
					placeholder="Username"
					onChange={onChange}
				/>
			</div>
			<button class="btn" onClick={onNext} disabled={!username}>
				Next
			</button>
		</>
	)
}

type ChoosePasswordProps = RouteComponentProps

// TODO: Encrypt and save mnemonic + profile in localstorage
const ChoosePassword = (_: ChoosePasswordProps) => {
	const [showPrompt, setShowPrompt] = useState(true)
	const [passwords, setPasswords] = useState<[string, string]>(['', ''])
	const changePassword = (
		index: number,
		{ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>
	) => {
		const copy = [...passwords] as [string, string]
		copy[index] = currentTarget.value
		setPasswords(copy)
	}

	const passwordsFilledIn = passwords[0].length > 0 && passwords[1].length > 0
	const passwordValid = passwords[0].length > 0 && passwords[0] === passwords[1]
	const canNext = showPrompt || passwordValid

	const navigate = useNavigate()
	const onNext = () => {
		if (showPrompt) {
			setShowPrompt(false)
			return
		}

		if (!canNext) {
			return
		}

		navigate('/login/done')
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
				class="btn w-min place-self-center"
				onClick={onNext}
				disabled={!canNext}
			>
				Next
			</button>
		</div>
	)
}

type DoneProps = RouteComponentProps

const Done = (_: DoneProps) => {
	const [profile] = useStore.profile()
	const { username } = profile

	return (
		<>
			<h1 class="text-3xl mb-4">Great!</h1>
			<p class="mb-16">You now have a Swarm City account.</p>
			<p class="mb-16">{username}</p>
			<button class="btn">Enter Swarm.City</button>
		</>
	)
}

type LoginPageProps = RouteComponentProps

// TODO: Don't change global state until the entire login flow is done
// TODO: Refactor this without using the router, see NOTE
// NOTE: This could also be combined in a single component without routing,
// which would make it impossible to reach an invalid state via direct URL
export const LoginPage = (_: LoginPageProps) => (
	<Wrapper>
		<Router>
			<Login path="/" />
			<CreateAccount path="/create" />
			<ConfirmWords path="/confirm-words" />
			<SetupProfile path="/setup-profile" />
			<ChoosePassword path="/choose-password" />
			<Done path="/done" />
		</Router>
	</Wrapper>
)
