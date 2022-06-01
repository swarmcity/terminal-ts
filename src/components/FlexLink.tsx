import { Link } from '@reach/router'

// Types
import type { LinkProps } from '@reach/router'
import type { JSXInternal } from 'preact/src/jsx'

export interface FlexLinkProps<TState>
	extends Omit<LinkProps<TState>, 'ref' | 'to'>,
		Pick<JSXInternal.HTMLAttributes<HTMLAnchorElement>, 'href' | 'ref'> {
	to?: LinkProps<TState>['to']
}

export function FlexLink<TState>({
	href,
	to,
	...other
}: FlexLinkProps<TState>) {
	if (to && href) {
		console.warn('do not specify both `to` and `href`')
		return null
	}

	if (to) {
		return <Link to={to} {...other} />
	}

	return <a href={href} {...(other as unknown)} />
}
