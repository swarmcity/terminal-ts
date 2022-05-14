import { useRef, useState } from 'preact/hooks'

// Components
import { Cropper, CropperRef } from '../../components/cropper'

// Lib
import { blobToDataURL } from '../../lib/canvas'

// Assets
import DefaultAvatar from '../../../public/assets/avatar.png'

type SetupProfileProps = {
	onNext: (username: string, avatar?: Blob) => void
}

export const SetupProfile = ({ onNext }: SetupProfileProps) => {
	const cropperRef = useRef<CropperRef>(null)
	const [cropper, setCropper] = useState(false)
	const [avatar, setAvatar] = useState(DefaultAvatar)
	const [blob, setBlob] = useState<Blob>()
	const [username, setUsername] = useState<string>()

	const onChange = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		setUsername(currentTarget.value)
	}

	const updateAvatar = async () => {
		if (!cropperRef.current) {
			throw new Error('cropperRef not set')
		}

		try {
			const blob = await cropperRef.current?.getImage()

			setBlob(blob)
			setAvatar(URL.createObjectURL(blob))
			setCropper(false)
		} catch (err) {
			console.error(err)
		}
	}

	const goNext = () => {
		if (!username) {
			return
		}

		onNext(username, blob)
	}

	// TODO: Type the file change event
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFileChange = async (event: any) => {
		if (!(event.target instanceof HTMLInputElement)) {
			return
		}

		if (event.target.files?.length) {
			const file = event.target.files[0]
			setAvatar(await blobToDataURL(file))
		}
	}

	if (cropper) {
		return (
			<>
				<h1 class="text-3xl mb-8">Choose an avatar.</h1>
				<div class="form-control">
					<Cropper ref={cropperRef} wrapperClass="mb-8" image={avatar} />
				</div>
				<label class="mb-4 block cursor-pointer underline decoration-dotted">
					<input
						type="file"
						onChange={onFileChange}
						accept="image/*"
						class="hidden"
					/>
					choose another file
				</label>
				<button class="btn mr-4" onClick={() => setCropper(false)}>
					Cancel
				</button>
				<button class="btn" onClick={() => updateAvatar()}>
					Next
				</button>
			</>
		)
	}

	return (
		<>
			<h1 class="text-3xl mb-8">Choose a username and an avatar.</h1>
			<div class="form-control mb-4">
				<img
					src={avatar}
					class="rounded-full mb-4"
					onClick={() => setCropper(true)}
				/>

				<input
					type="text"
					class="input input-bordered"
					placeholder="Username"
					onChange={onChange}
				/>
			</div>
			<button class="btn" onClick={goNext} disabled={!username}>
				Next
			</button>
		</>
	)
}
