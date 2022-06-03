import cn from 'classnames'

// Components
import { ButtonClose } from '../../ButtonClose'
import { ButtonRoundArrow } from '../../ButtonRoundArrow'

// Types
import type { ButtonCloseProps } from '../../ButtonClose'
import type { ButtonRoundArrowProps } from '../../ButtonRoundArrow'
import type { ComponentChildren } from 'preact'

// Style
import classes from './confirm-modal.module.css'

export type ConfirmModalProps<CancelState, ConfirmState> = {
	cancel: ButtonCloseProps<CancelState>
	confirm: ButtonRoundArrowProps<ConfirmState>
	children: ComponentChildren
}

export const ConfirmModal = <CancelState, ConfirmState>({
	cancel,
	confirm,
	children,
}: ConfirmModalProps<CancelState, ConfirmState>) => {
	return (
		<div class={cn(classes.confirmModal, 'bg-info')}>
			<div class="container">
				<main class="flex-space">
					<header>{children}</header>
					<div class="btns btn-icons">
						<ButtonClose className="close" {...cancel} />
						<ButtonRoundArrow type="submit" variant="negative" {...confirm} />
					</div>
				</main>
			</div>
		</div>
	)
}
