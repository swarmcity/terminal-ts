import { useStore } from '../../store'
import avatarDefault from '../../assets/imgs/avatar.svg?url'
import arrowUp from '../../assets/imgs/arrowUp.svg?url'
import { CREATE_AVATAR, ACCOUNT_PASSWORD } from '../../routes'
import { ButtonRoundArrow } from '../../components/ButtonRoundArrow'
import { ButtonClose } from '../../components/ButtonClose'
import { RouteComponentProps } from '@reach/router'

type Props = RouteComponentProps

export const SetupProfile = (_: Props) => {
	const [profile, setProfile] = useStore.profile()

	return (
		<div class="bg-gray-lt choose-username">
			<div class="close">
				<ButtonClose />
			</div>
			<div class="container">
				<main class="flex-space">
					<header>
						<h1>Choose a username and an avatar.</h1>
					</header>
					<div class="content">
						<a href={CREATE_AVATAR}>
							<figure class="avatar">
								<img src={profile?.avatar || avatarDefault} alt="user avatar" />
								<a class="btn-icon btn-info btn-upload" href={CREATE_AVATAR}>
									<img src={arrowUp} />
								</a>
							</figure>
						</a>
						<form>
							<label for="username" class="form-label">
								Username
							</label>
							<input
								type="text"
								id="username"
								onChange={(e) =>
									setProfile({ ...profile, username: e.currentTarget.value })
								}
							/>
						</form>
					</div>
					<div class="btns">
						<ButtonRoundArrow
							disabled={!profile?.username}
							href={ACCOUNT_PASSWORD}
						/>
					</div>
				</main>
			</div>
		</div>
	)
}
