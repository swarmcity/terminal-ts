import avatarDefault from '../assets/imgs/avatar.svg?url'
import exit from '../assets/imgs/exit.svg?url'
import { HOME } from '../routes'
import { useStore } from '../store'
import { RouteComponentProps } from '@reach/router'
import { CreateAvatar } from './modals/create-avatar'

type Props = RouteComponentProps

export const Account = (_: Props) => {
	const [profile] = useStore.profile()

	return (
		<div class="bg-gray-lt account-wallet">
			<div class="icon-exit">
				<a href={HOME}>
					<img src={exit} />
				</a>
			</div>
			<div class="container">
				<main class="flex-space">
					<figure class="avatar avatar-sm">
						<CreateAvatar>
							<a href="#">
								<img src={profile?.avatar || avatarDefault} alt="user avatar" />
							</a>
						</CreateAvatar>
						<figcaption>
							<a href="#" class="username">
								{profile?.username}
							</a>
							<div>
								<a href="#" class="wallet-balance">
									0 DAI
								</a>
							</div>
						</figcaption>
					</figure>
				</main>
			</div>
		</div>
	)
}
