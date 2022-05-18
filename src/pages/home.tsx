import { navigate, RouteComponentProps } from '@reach/router'
import logo from '../assets/imgs/logo.svg?url'
import { ACCOUNT, LOGIN } from '../routes'
import { useStore } from '../store'

type HomeProps = RouteComponentProps

export const Home = (_: HomeProps) => {
	const [profile] = useStore.profile()

	const onClick = () => {
		if (
			profile &&
			profile.address &&
			profile.encryptedWallet &&
			profile.username
		)
			navigate(ACCOUNT)
		else navigate(LOGIN)
	}

	return (
		<>
			<div class="welcome">
				<div class="bg-warning">
					<main class="container">
						<div class="d-flex w-100">
							<div>
								<img src={logo} id="logo" class="mx-auto" />
								<h1>
									Welcome to
									<br />
									<span>swarm.</span>
									<span>city</span>
								</h1>
							</div>
							<a className="btn btn-warning" onClick={onClick}>
								enter here
							</a>
						</div>
					</main>
				</div>
				<nav class="bg-white links">
					<div class="container">
						<span>
							<a
								href="https://swarm.city/"
								class="link"
								target="_blank"
								rel="noreferrer"
							>
								What is Swarm City?
							</a>
						</span>
						<span>
							<a
								href="https://discord.com/invite/NvnmBmCavn"
								class="link"
								target="_blank"
								rel="noreferrer"
							>
								Support
							</a>
						</span>
					</div>
				</nav>
				<address class="bg-gray-lt">
					<div class="container">
						<div class="p-1">
							<b>Find Swarm City on</b>
						</div>
						<div>
							<a
								class="p-1"
								href="https://discord.com/invite/NvnmBmCavn"
								target="_blank"
								rel="noreferrer"
							>
								Discord
							</a>
						</div>
						<div>
							<a
								class="p-1"
								href="https://twitter.com/SwarmCityDApp"
								target="_blank"
								rel="noreferrer"
							>
								Twitter
							</a>
						</div>
						<div>
							<a
								class="p-1"
								href="https://medium.com/swarm-city-times"
								target="_blank"
								rel="noreferrer"
							>
								Medium
							</a>
						</div>
						<div>
							<a
								class="p-1"
								href="https://github.com/swarmcity"
								target="_blank"
								rel="noreferrer"
							>
								Github
							</a>
						</div>
						<div>
							<a
								class="p-1"
								href="https://www.youtube.com/channel/UCsHBWn_ytZ3xdMbTyYe5Ifg"
								target="_blank"
								rel="noreferrer"
							>
								Youtube
							</a>
						</div>
					</div>
				</address>
			</div>
		</>
	)
}
