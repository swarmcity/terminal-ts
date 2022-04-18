import { Wallet } from 'ethers'

type GenerateMnemonicProps = {
	wallet: Wallet
	onNext: () => void
}

export const GenerateMnemonic = ({ wallet, onNext }: GenerateMnemonicProps) => {
	const words = wallet.mnemonic.phrase.split(' ')
	const lists = [words.slice(0, 6), words.slice(6)]

	return (
		<>
			<h1 class="text-3xl mb-8">Write down these 12 words.</h1>
			<div class="flex place-content-stretch mb-8">
				{lists.map((words, index) => (
					<div class="grow">
						<ol
							class="list-decimal w-min mx-auto text-left"
							start={1 + 6 * index}
						>
							{words.map((word) => (
								<li>{word}</li>
							))}
						</ol>
					</div>
				))}
			</div>
			<button class="btn" onClick={onNext}>
				Next
			</button>
		</>
	)
}
