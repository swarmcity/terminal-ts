import { Link } from '@reach/router'

// Assets
import close from '../assets/imgs/close.svg?url'
import closeWhite from '../assets/imgs/closeWhite.svg?url'

// Types
import type { LinkProps } from '@reach/router'
import type { JSXInternal } from 'preact/src/jsx'

interface Props<TState>
	extends Omit<LinkProps<TState>, 'ref' | 'to'>,
		Pick<JSXInternal.HTMLAttributes<HTMLAnchorElement>, 'href' | 'ref'> {
	variant?: 'light' | 'dark'
	to?: LinkProps<TState>['to']
}

export function ButtonClose<TState>({
	variant,
	href,
	to,
	...other
}: Props<TState>) {
	const image = <img src={variant === 'light' ? closeWhite : close} />

	if (to && href) {
		console.warn('do not specify both `to` and `href`')
		return null
	}

	if (to) {
		return (
			<Link role="button" to={to} {...other}>
				{image}
			</Link>
		)
	}

	// NOTE: Is this fallback actually necessary?
	// TODO: Remove?
	return (
		<a role="button" href={href} {...(other as unknown)}>
			<img src={variant === 'light' ? closeWhite : close} />
		</a>
	)
}
