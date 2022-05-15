import { Link, RouteComponentProps } from '@reach/router'
import { ButtonClose } from '../components/ButtonClose'
import { CREATE_ACCOUNT } from '../routes'

type LoginProps = RouteComponentProps

export const Login = (_: LoginProps) => (
	<div class="bg-info create-account">
		<div class="close">
			<ButtonClose href="index.html" variant="light" />
		</div>
		<div class="container">
			<main class=" flex-space">
				<header>
					<h1>Let's create an account.</h1>
					<p>
						No account was found on this device. When you restore or create a
						new account, it is stored locally on your device.
					</p>
				</header>
				<div class="btns">
					<Link className="btn btn-info" to={CREATE_ACCOUNT}>
						create account
					</Link>
					<a class="btn btn-info" href="user-restore-file.html">
						restore account
					</a>
				</div>
			</main>
		</div>
	</div>
)
