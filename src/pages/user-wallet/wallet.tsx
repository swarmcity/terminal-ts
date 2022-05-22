// Store
import { RouteComponentProps } from '@reach/router'
import { useStore } from '../../store'
import { ButtonClose } from '../../components/ButtonClose'
import { ACCOUNT } from '../../routes'

export const AccountWallet = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()

	const { username, avatar } = profile

	if (!profile) {
		return <div>Error: no profile</div>
	}

	return (
		<div class="bg-gray-lt user-wallet">
			<div class="close">
				<ButtonClose href={ACCOUNT} variant="dark" />
			</div>
			<div class="container">
				<div class="flex-space">
					<div class="wallet-balance">
						44 DAI
						<span class="usd">≈ 44 USD</span>
					</div>
					<div>
						<a href="user-keys-public.html" class="link link-dark">
							show my keys
						</a>
					</div>
				</div>
			</div>
			<div class="divider short" />
			<div class="container">
				<div class="flex-space">
					<a href="user-wallet-send.html" class="btn btn-info">
						send DAI
					</a>
					<a href="user-keys-public-qr.html" class="btn btn-info">
						receive
					</a>
				</div>
			</div>
			<div class="divider short" />
			<div class="container">
				<div class="flex-space">
					<div class="history">
						<div class="history-item">
							<div class="date">13 Jan 2022 - 22:33</div>
							<div class="tx-amt">Received 7 DAI from 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
						<div class="history-item">
							<div class="date">09 Jan 2022 - 22:33</div>
							<div class="tx-amt">Sent 18 DAI to 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
						<div class="history-item">
							<div class="date">01 Dec 2021 - 19:03</div>
							<div class="tx-amt">Received 7 DAI from 0x0...</div>
							<div>
								<a href="#" class="link link-dark">
									show on etherscan
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
