import { Wallet } from 'ethers'
import { Ref } from 'preact'
import { forwardRef } from 'preact/compat'
import { useImperativeHandle, useState } from 'preact/hooks'

// Hooks
import { useDeferredPromise } from '../../hooks/useDeferredPromise'

// Components
import { PasswordModal } from './password/password'

export type PasswordSignerProps = Record<string, unknown>
export type PasswordSignerRef = {
	getSigner(): Promise<Wallet>
}

const PasswordSignerInner = (
	_: PasswordSignerProps,
	ref: Ref<PasswordSignerRef>
) => {
	const [showPassword, setShowPassword] = useState(false)
	const { defer, deferRef } = useDeferredPromise<Wallet>()

	useImperativeHandle(ref, () => ({
		getSigner: async () => {
			setShowPassword(true)
			return defer().promise
		},
	}))

	return (
		<PasswordModal
			show={showPassword}
			onClose={() => setShowPassword(false)}
			onSuccess={(wallet) => {
				deferRef?.resolve(wallet)
			}}
		/>
	)
}

export const PasswordSigner = forwardRef<
	PasswordSignerRef,
	PasswordSignerProps
>(PasswordSignerInner)
