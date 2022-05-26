import { JSXInternal } from 'preact/src/jsx'
import caretNext from '../assets/imgs/caretNext.svg?url'

const directions = {
	right: 0,
	down: 90,
	left: 180,
	up: 270,
}

interface ButtonRoundArrowProps
	extends JSXInternal.HTMLAttributes<HTMLAnchorElement> {
	direction?: keyof typeof directions
}

export function ButtonRoundArrow({
	disabled,
	direction,
	...other
}: ButtonRoundArrowProps) {
	const rotation = directions[direction || 'right']
	const img = (
		<img src={caretNext} style={{ transform: `rotate(${rotation}deg)` }} />
	)

	if (disabled)
		return (
			<span class="btn-icon" style={{ cursor: 'not-allowed', opacity: 0.5 }}>
				{img}
			</span>
		)

	return (
		<a role="button" class={'btn-icon'} {...other}>
			{img}
		</a>
	)
}
