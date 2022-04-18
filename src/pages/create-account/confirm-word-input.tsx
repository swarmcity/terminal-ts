import { useState } from 'preact/hooks'
import cn from 'classnames'

type ConfirmWordInputProps = {
	number: number
	word: string
	onChange: (correct: boolean) => void
}

export const ConfirmWordInput = ({
	number,
	word,
	onChange,
}: ConfirmWordInputProps) => {
	const [correct, setCorrect] = useState<boolean | null>(null)
	const checkWord = ({
		currentTarget,
	}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		const correct = currentTarget.value === word
		setCorrect(correct)
		onChange(correct)
	}

	return (
		<div class="form-control mb-4">
			<input
				type="text"
				class={cn(
					'input',
					'input-bordered',
					correct === true && 'input-success',
					correct === false && 'input-error'
				)}
				placeholder={`Word ${number}`}
				onChange={checkWord}
			/>
		</div>
	)
}
