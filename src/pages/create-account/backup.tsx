import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

// Icons
import { ExclamationIcon } from '../../icons/exclamation'

// Store
import { useStore } from '../../store'

export const Backup = () => {
	const [showPrompt, setShowPrompt] = useState(true)
	const [profile] = useStore.profile()
	const blob = useMemo(
		() =>
			new Blob([JSON.stringify(profile)], {
				type: 'application/json',
			}),
		[profile]
	)

	const downloadFile = useCallback(() => {
		const elem = window.document.createElement('a')
		elem.href = window.URL.createObjectURL(blob)
		elem.download = 'swarm-city-wallet.json'
		document.body.appendChild(elem)
		elem.click()
		document.body.removeChild(elem)
	}, [blob])

	useEffect(() => {
		if (!showPrompt) {
			downloadFile()
		}
	}, [showPrompt, downloadFile])

	if (showPrompt) {
		return (
			<div class="flex flex-col">
				<h1 class="text-3xl mb-8">Back up your account</h1>
				<div class="w-full indicator mb-8 mt-6">
					<div class="indicator-item indicator-top indicator-center badge h-12">
						<ExclamationIcon class="w-8 h-8 " />
					</div>
					<div class="card shadow place-items-center">
						<div class="card-body bg-base-300 font-bold">
							<div class="pt-2">
								<p class="mb-4">
									There are no central servers on which accounts are stored.
								</p>
								<p>
									This means you are responsible for your own account at all
									times.
								</p>
							</div>
						</div>
					</div>
				</div>
				<button
					class="btn w-min place-self-center"
					onClick={() => setShowPrompt(false)}
				>
					Next
				</button>
			</div>
		)
	}

	return (
		<div class="flex flex-col">
			<h1 class="text-3xl mb-8">Save the file in a safe location</h1>
			<div class="pt-2 mb-8">
				<p class="mb-4">
					A download should begin. Save the file somehwere safe. With this file
					you will alwasy be able to get access to the funds on your wallet.
				</p>
				<p class="mb-4">
					The private key of your account is encrypted with your password.
				</p>
				<a
					style={{
						textDecoration: 'underline dotted',
						color: 'blue',
						cursor: 'pointer',
					}}
					onClick={() => downloadFile()}
				>
					force download
				</a>
			</div>
			<button
				class="btn place-self-center"
				onClick={() => setShowPrompt(false)}
			>
				Enter Swarm City
			</button>
		</div>
	)
}
