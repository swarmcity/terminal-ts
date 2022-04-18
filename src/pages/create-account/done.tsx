// Store
import { useStore } from '../../store'

export const Done = () => {
	const [profile] = useStore.profile()

	if (!profile) {
		return <div>Error: no profile</div>
	}

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
