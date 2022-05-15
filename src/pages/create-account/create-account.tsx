import { ComponentChildren } from 'preact'
import { useState, useMemo } from 'preact/hooks'
import { Wallet } from 'ethers'
import { RouteComponentProps } from '@reach/router'

// Components
import { ChoosePassword } from './choose-password'
import { SetupProfile } from './setup-profile'
import { useStore } from '../../store'
import { Backup } from './backup'

// Lib
import { blobToDataURL } from '../../lib/canvas'

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
	const [username, setUsername] = useState<string>('')
	const [avatar, setAvatar] = useState<Blob>()

	// Global state
	const [profile, setProfile] = useStore.profile()
	const saveProfile = async (encryptedWallet: string) => {
		setProfile({
			username,
			address: wallet.address,
			encryptedWallet,
			avatar: avatar && (await blobToDataURL(avatar)),
		})
	}

	return (
		<Wrapper>
			{!username ? (
				<SetupProfile />
			) : !profile ? (
				<ChoosePassword wallet={wallet} onNext={saveProfile} />
			) : (
				<Backup />
			)}
		</Wrapper>
	)
}
