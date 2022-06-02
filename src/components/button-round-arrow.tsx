// Assets
import caretNext from '../assets/imgs/caretNext.svg?url'

// Components
import { FlexLink, FlexLinkProps } from './flex-link'

const directions = {
	right: 0,
	down: 90,
	left: 180,
	up: 270,
}

interface ButtonRoundArrowProps<TState> extends FlexLinkProps<TState> {
	disabled?: boolean
	direction?: keyof typeof directions
}

export function ButtonRoundArrow<TState>({
	disabled,
	direction,
	...other
}: ButtonRoundArrowProps<TState>) {
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
		<FlexLink role="button" className={'btn-icon'} {...other}>
			{img}
		</FlexLink>
	)
}
