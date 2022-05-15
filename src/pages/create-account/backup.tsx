import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { RouteComponentProps } from '@reach/router'
import { ButtonClose } from '../../components/ButtonClose'
import warningBlue from '../../assets/imgs/warningBlue.svg?url'
import { useStore } from '../../store'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'
import { ACCOUNT } from '../../routes'

type Props = RouteComponentProps

export const Backup = (_: Props) => {
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
			<div class="bg-gray-lt download-file">
				<div class="close">
					<ButtonClose href="user-create-stop.html" />
				</div>
				<div class="container">
					<main class="flex-space">
						<header>
							<h1>Back up your account</h1>
						</header>
						<div class="warning-box">
							<img src={warningBlue} />
							<div>
								<p>
									There are no central servers on which accounts are stored.{' '}
									<br />
									This means you are responsible for your own account at all
									times.
								</p>
							</div>
						</div>
						<ButtonRoundArrow onClick={() => setShowPrompt(false)} />
					</main>
				</div>
			</div>
		)
	}

	return (
		<div class="bg-gray-lt download-success">
			<div class="close">
				<a href="user-exit.html">
					<img src="assets/imgs/close.svg" />
				</a>
			</div>
			<div class="container">
				<main class="flex-space">
					<header>
						<h1>Save the file in a safe location</h1>
						<p>
							A download should begin. Save the file somehwere safe. With this
							file you will alwasy be able to get access to the funds on your
							wallet.
						</p>
						<p>
							The private key of your account is encrypted with your password.
						</p>
					</header>
					<div>
						<a onClick={() => downloadFile()} class="link">
							force download
						</a>
					</div>
					<div class="btns">
						<a class="btn btn-light" href={ACCOUNT}>
							enter swarm.city
						</a>
					</div>
				</main>
			</div>
		</div>
	)

	// return (
	// 	<div class="flex flex-col">
	// 		<h1 class="text-3xl mb-8">Save the file in a safe location</h1>
	// 		<div class="pt-2 mb-8">
	// 			<p class="mb-4">
	// 				A download should begin. Save the file somehwere safe. With this file
	// 				you will alwasy be able to get access to the funds on your wallet.
	// 			</p>
	// 			<p class="mb-4">
	// 				The private key of your account is encrypted with your password.
	// 			</p>
	// 			<a
	// 				style={{
	// 					textDecoration: 'underline dotted',
	// 					color: 'blue',
	// 					cursor: 'pointer',
	// 				}}
	// 				onClick={() => downloadFile()}
	// 			>
	// 				force download
	// 			</a>
	// 		</div>
	// 		<button
	// 			class="btn place-self-center"
	// 			onClick={() => setShowPrompt(false)}
	// 		>
	// 			Enter Swarm City
	// 		</button>
	// 	</div>
	// )
}
