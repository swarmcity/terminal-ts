import { useState } from 'preact/hooks'

type SetupProfileProps = {
	onNext: (username: string) => void
}

export const SetupProfile = ({ onNext }: SetupProfileProps) => {
	const [username, setUsername] = useState<string>()
	const onChange = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		setUsername(currentTarget.value)
	}

	const goNext = () => {
		if (!username) {
			return
		}

		onNext(username)
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
			<button class="btn" onClick={goNext} disabled={!username}>
				Next
			</button>
		</>
	)
}
