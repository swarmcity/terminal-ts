// Store
import { RouteComponentProps } from '@reach/router'
import { useRef, useState } from 'preact/hooks'
import { useStore } from '../../store'
import cancel from '../../assets/imgs/cancel.svg?url'
import checkMarkBlue from '../../assets/imgs/checkMarkBlue.svg?url'
import iconRotate from '../../assets/imgs/iconRotate.svg?url'
import { blobToDataURL } from '../../lib/canvas'
import { Cropper, CropperRef } from '../../components/cropper'
import { CREATE_ACCOUNT } from '../../routes'
import { JSXInternal } from 'preact/src/jsx'

export const CreateAvatar = (_: RouteComponentProps) => {
	const [avatar, setAvatar] = useState<string>('')
	const cropperRef = useRef<CropperRef>(null)

	const [profile, setProfile] = useStore.profile()

	const onFileChange = async (
		event: JSXInternal.TargetedEvent<HTMLInputElement, Event>
	) => {
		if (!(event.target instanceof HTMLInputElement)) {
			return
		}

		if (event.target.files?.length) {
			const file = event.target.files[0]
			setAvatar(await blobToDataURL(file))
		}
	}

	const updateAvatar = async (): Promise<string> => {
		if (cropperRef.current) {
			return await cropperRef.current?.getImage()
		}
		throw new Error('cropperRef not set')
	}

	return (
		<div class="bg-gray-lt set-avatar">
			<div class="container">
				<main class="flex-space">
					<header>
						<div class="canvas">
							<Cropper ref={cropperRef} wrapperClass="mb-8" image={avatar} />
							<a
								role="button"
								onClick={() => cropperRef.current?.rotateCW()}
								class="rotate"
							>
								<img src={iconRotate} />
							</a>
						</div>
						<p>Scroll to zoom - drag to move</p>
					</header>
					<div class="btns">
						<a class="close" href={CREATE_ACCOUNT}>
							<img src={cancel} />
						</a>
						<a
							class="btn-icon"
							onClick={() => {
								updateAvatar().then((newAvatar) =>
									setProfile({ ...profile, avatar: newAvatar })
								)
							}}
						>
							<img src={checkMarkBlue} />
						</a>
					</div>
				</main>
				<div class="bottomlink">
					<label class="link">
						<input
							type="file"
							onChange={onFileChange}
							accept="image/*"
							hidden
						/>
						choose another file
					</label>
				</div>
			</div>
		</div>
	)
}
