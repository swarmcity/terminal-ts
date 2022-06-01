import { useBalance } from 'wagmi'
import { Link, Redirect, RouteComponentProps } from '@reach/router'

// Routes and store
import { ACCOUNT_WALLET, HOME, LOGIN } from '../routes'
import { useStore } from '../store'

// Components
import { CreateAvatar } from '../components/modals/create-avatar'

// Assets
import avatarDefault from '../assets/imgs/avatar.svg?url'
import exit from '../assets/imgs/exit.svg?url'

type Props = RouteComponentProps

export const Account = (_: Props) => {
	const [profile, setProfile] = useStore.profile()
	const { data: balance } = useBalance()
	const formattedBalance = balance
		? `${balance.formatted} ${balance.symbol}`
		: '0 xDAI'

	if (!profile?.address) {
		return <Redirect to={LOGIN} noThrow />
	}

	return (
		<div class="bg-gray-lt account-wallet">
			<div class="icon-exit">
				<a style={{ cursor: 'pointer' }} onClick={() => setProfile()}>
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
								<Link to={ACCOUNT_WALLET} className="wallet-balance">
									{formattedBalance}
								</Link>
							</div>
						</figcaption>
					</figure>
				</main>
			</div>
		</div>
	)
}
