import { JSXInternal } from 'preact/src/jsx'
import close from '../assets/imgs/close.svg?url'
import closeWhite from '../assets/imgs/closeWhite.svg?url'

interface Props extends JSXInternal.HTMLAttributes<HTMLAnchorElement> {
	variant?: 'light' | 'dark'
}

export function ButtonClose({ variant, ...other }: Props) {
	return (
		<a role="button" {...other}>
			<img src={variant === 'light' ? closeWhite : close} />
		</a>
	)
}
