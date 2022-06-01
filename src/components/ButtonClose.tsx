// Assets
import close from '../assets/imgs/close.svg?url'
import closeWhite from '../assets/imgs/closeWhite.svg?url'

// Components
import { FlexLink, FlexLinkProps } from './FlexLink'

interface ButtonCloseProps<TState> extends FlexLinkProps<TState> {
	variant?: 'light' | 'dark'
}

export function ButtonClose<TState>({
	variant,
	...other
}: ButtonCloseProps<TState>) {
	return (
		<FlexLink role="button" {...other}>
			<img src={variant === 'light' ? closeWhite : close} />
		</FlexLink>
	)
}
