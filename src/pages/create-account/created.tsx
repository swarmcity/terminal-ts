// Store
import { useStore } from '../../store'

type CreatedProps = {
	onNext: () => void
}

export const Created = ({ onNext }: CreatedProps) => {
	const [profile] = useStore.profile()

	if (!profile) {
		return <div>Error: no profile</div>
	}

	const { username } = profile

	return (
		<>
			<h1 class="text-3xl mb-4">Great!</h1>
			<p>You now have a Swarm City account.</p>
			<p class="mb-16">Let's create a backup!</p>
			<p class="mb-16">{username}</p>
			<button class="btn" onClick={onNext}>
				Backup my account
			</button>
		</>
	)
}
