// Store
import { RouteComponentProps } from '@reach/router'
import { useStore } from '../../store'
import { ButtonClose } from '../../components/ButtonClose'
import avatarDefault from '../../assets/imgs/avatar.svg?url'
import { ACCOUNT_BACKUP } from '../../routes'

export const AccountCreated = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()

	if (!profile) {
		return <div>Error: no profile</div>
	}

	const { username, avatar } = profile

	return (
		<div class="bg-gray-lt account-complete">
			<div class="close">
				<ButtonClose href="user-create-stop.html" />
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
							<img src={avatar || avatarDefault} alt="user avatar" />
						</figure>
						<p class="username">{username}</p>
					</div>
					<div class="btns">
						<a class="btn btn-light" href={ACCOUNT_BACKUP}>
							backup my account
						</a>
					</div>
				</main>
			</div>
		</div>
	)
}
