import { ComponentChildren } from 'preact'
import { useState, useMemo } from 'preact/hooks'
import { Wallet } from 'ethers'

// Components
import { ChoosePassword } from './choose-password'
import { ConfirmWords } from './confirm-words'
import { GenerateMnemonic } from './generate-mnemonic'
import { Done } from './done'
import { SetupProfile } from './setup-profile'
import { useStore } from '../../store'
import { RouteComponentProps } from '@reach/router'

type WrapperProps = {
	children: ComponentChildren
}

const Wrapper = ({ children }: WrapperProps) => (
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="max-w-sm text-center">{children}</div>
	</div>
)

type CreateAccountProps = RouteComponentProps

export const CreateAccount = (_: CreateAccountProps) => {
	const wallet = useMemo(() => Wallet.createRandom(), [])

	// Local state
	const [showWallet, setShowWallet] = useState<boolean>(true)
	const [walletConfirmed, setWalletConfirmed] = useState(false)
	const [username, setUsername] = useState<string>('')

	// Global state
	const [profile, setProfile] = useStore.profile()
	const saveProfile = (encryptedWallet: string) => {
		setProfile({
			username,
			address: wallet.address,
			encryptedWallet,
		})
	}

	return (
		<Wrapper>
			{showWallet ? (
				<GenerateMnemonic wallet={wallet} onNext={() => setShowWallet(false)} />
			) : !walletConfirmed ? (
				<ConfirmWords
					wallet={wallet}
					onNext={() => setWalletConfirmed(true)}
					onBack={() => setShowWallet(true)}
				/>
			) : !username ? (
				<SetupProfile onNext={setUsername} />
			) : !profile ? (
				<ChoosePassword wallet={wallet} onNext={saveProfile} />
			) : (
				<Done />
			)}
		</Wrapper>
	)
}
