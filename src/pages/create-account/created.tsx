// Store
import { RouteComponentProps } from '@reach/router'
import { useStore } from '../../store'

export const AccountCreated = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()

	if (!profile) {
		return <div>Error: no profile</div>
	}

	const { username } = profile

	return (
		<div class="bg-gray-lt account-complete">
			<div class="close">
				<a href="user-create-stop.html">
					<img src="assets/imgs/close.svg" />
				</a>
			</div>
			<div class="container">
				<main class="flex-space">
					<header>
						<h1>Great!</h1>
						<p>
							You now have a Swarm City account.
							<br />
							Let's create a backup!
						</p>
					</header>
					<div class="content">
						<figure class="avatar">
							<img src="assets/imgs/avatar.svg" alt="user avatar" />
						</figure>
						<p class="username">{username}</p>
					</div>
					<div class="btns">
						<a class="btn btn-light" href="user-backup-print-download.html">
							backup my account
						</a>
					</div>
				</main>
			</div>
		</div>
	)
}
