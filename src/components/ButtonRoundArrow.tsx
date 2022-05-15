import { JSXInternal } from 'preact/src/jsx'
import caretNext from '../assets/imgs/caretNext.svg?url'

interface Props extends JSXInternal.HTMLAttributes<HTMLAnchorElement> {
	direction?: 'left' | 'right' | 'up' | 'down'
}

export function ButtonRoundArrow({ disabled, direction, ...other }: Props) {
	let rotation = 0

	switch (direction) {
		case 'left':
			rotation = 180
			break
		case 'up':
			rotation = 270
			break
		case 'down':
			rotation = 90
			break
		default:
			rotation = 0
			break
	}
	return (
		<a
			role="button"
			class={`btn-icon ${disabled ? 'btn-disabled' : ''}`}
			{...other}
		>
			<img src={caretNext} style={{ transform: `rotate(${rotation}deg)` }} />
		</a>
	)
}
