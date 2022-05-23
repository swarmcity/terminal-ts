import { useState } from 'preact/hooks'
import { Redirect } from '@reach/router'
import { QRCodeSVG } from 'qrcode.react'

// Components
import { ButtonClose } from '../../components/ButtonClose'

// Store and routes
import { useStore } from '../../store'
import { LOGIN, ACCOUNT_WALLET } from '../../routes'

// Types
import type { RouteComponentProps } from '@reach/router'

type AccountPublicWalletProps = RouteComponentProps

export const AccountPublicWallet = (_: AccountPublicWalletProps) => {
	const [showQR, setShowQR] = useState(false)
	const [profile] = useStore.profile()

	if (!profile || !profile.address) {
		return <Redirect path={LOGIN} />
	}

	const copyAddress = () => {
		// TODO: Add some visual effect to show that this worked
		navigator.clipboard.writeText(profile?.address ?? '')
	}

	return (
		<div class="bg-gray-lt keys">
			<div class="close">
				<ButtonClose href={ACCOUNT_WALLET} variant="dark" />
			</div>

			<main class="flex-space">
				<div class="container">
					<p>Your address:</p>
					<p class="key key-public">{profile.address}</p>
					<div class="links">
						<a
							class="link"
							style={{ cursor: 'pointer' }}
							onClick={() => copyAddress()}
						>
							copy address
						</a>
						<a
							class="link"
							style={{ cursor: 'pointer' }}
							onClick={() => setShowQR(!showQR)}
						>
							{showQR ? 'hide' : 'show'} QR code
						</a>
					</div>
					{showQR && (
						<figure class="qrcode">
							<QRCodeSVG value={profile.address} />
						</figure>
					)}
				</div>
				<div class="divider" />
				<div class="container">
					<p>Your private key:</p>
					<p class="key key-private key-hidden">
						Be careful in displaying your private key. It's the only thing
						needed to steal your funds.
					</p>
				</div>
				{/* TODO: We need the password modal for this */}
				<div class="container">
					<div class="btns">
						<button class="btn btn-light">show private key</button>
					</div>
				</div>
			</main>
		</div>
	)
}
