import { useState } from 'preact/hooks'
import { ButtonClose } from '../../components/ButtonClose'
import checkMarkRed from '../../assets/imgs/checkMarkRed.svg?url'
import { LOGIN } from '../../routes'

export const UserCreateStop = () => {
	const [shown, setShown] = useState<boolean>()

	if (!shown) return <ButtonClose onClick={() => setShown(true)} />

	return (
		<div
			class="bg-danger py-60 stop-creating"
			style={{
				width: '100vw',
				height: '100vh',
				zIndex: 100,
				position: 'fixed',
				paddingTop: 137,
				left: 0,
				top: 0,
			}}
		>
			<div class="container">
				<main class="flex-space">
					<header>
						<h1>Stop creating user account?</h1>
					</header>
					<div class="btns">
						<ButtonClose onClick={() => setShown(false)} />
						<a class="btn-icon" href={LOGIN}>
							<img src={checkMarkRed} />
						</a>
					</div>
				</main>
			</div>
		</div>
	)
}
