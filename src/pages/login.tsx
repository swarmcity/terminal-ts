import { Link, RouteComponentProps } from '@reach/router'

type LoginProps = RouteComponentProps

export const Login = (_: LoginProps) => (
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="max-w-sm text-center">
			<h1 class="text-3xl mb-4">Let's create an account.</h1>
			<p class="mb-16">
				No account was found on this device. When you restore or create a new
				account, it is stored locally on your device.
			</p>
			<div class="flex flex-col">
				<Link to="/create-account" className="btn mb-2" id="create-account-btn">
					Create account
				</Link>
				<button class="btn">Restore account</button>
			</div>
		</div>
	</div>
)
