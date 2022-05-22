// Store
import { RouteComponentProps } from '@reach/router'
import { useStore } from '../../store'
import { ButtonClose } from '../../components/ButtonClose'
import { ACCOUNT } from '../../routes'
import { useState } from 'preact/hooks'
import cancelButton from '../../assets/imgs/cancel.svg'
import sendButton from '../../assets/imgs/caretNext.svg'

export const AccountWallet = (_: RouteComponentProps) => {
	const [profile] = useStore.profile()

	const [sendShown, setSendShown] = useState<boolean>(true)

	let sendView

	if (sendShown) {
		sendView = (
			<div class="flex-space">
				<a onClick={() => setSendShown(false)} class="btn btn-info">
					send DAI
				</a>
				<a href="user-keys-public-qr.html" class="btn btn-info">
					receive
				</a>
			</div>
		)
	} else {
		sendView = (
			<div class="flex-space">
				<form class="send" _lpchecked="1">
					<div class="input-group">
						<input type="text" id="amt-send" />
						<label for="amt-send">Amount to send</label>
					</div>
					<label for="rec-address">Receiver's address</label>
					<input
						type="text"
						id="rec-address"
						placeholder="Receiver's address"
					/>
					<div class="btns btn-icons">
						<a class="close" onClick={() => setSendShown(true)}>
							<img src={cancelButton} />
						</a>
						<a class="btn-icon">
							<img src={sendButton} />
						</a>
					</div>
				</form>
			</div>
		)
	}

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
			<div class="container">{sendView}</div>
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
