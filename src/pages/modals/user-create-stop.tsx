import { useState } from 'preact/hooks'
import { Link } from '@reach/router'

// Components
import { ButtonClose } from '../../components/ButtonClose'

// Assets
import checkMarkRed from '../../assets/imgs/checkMarkRed.svg?url'

// Routes
import { LOGIN } from '../../routes'

export const UserCreateStop = () => {
	const [shown, setShown] = useState<boolean>()

	if (!shown) {
		return <ButtonClose onClick={() => setShown(true)} />
	}

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
						<Link className="btn-icon" to={LOGIN}>
							<img src={checkMarkRed} />
						</Link>
					</div>
				</main>
			</div>
		</div>
	)
}
