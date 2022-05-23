// Assets
import caretNext from '../assets/imgs/caretNext.svg?url'

// Components
import { FlexLink, FlexLinkProps } from './FlexLink'

interface ButtonRoundArrowProps<TState> extends FlexLinkProps<TState> {
	disabled?: boolean
	direction?: 'left' | 'right' | 'up' | 'down'
}

export function ButtonRoundArrow<TState>({
	disabled,
	direction,
	...other
}: ButtonRoundArrowProps<TState>) {
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
