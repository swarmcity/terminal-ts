import { useState, useMemo } from 'preact/hooks'

// Types
import type { Wallet } from 'ethers'

// Lib
import { shuffle } from '../../lib/tools'

// Components
import { ConfirmWordInput } from './confirm-word-input'

type ConfirmWordsProps = {
	wallet: Wallet
	onNext: () => void
	onBack: () => void
}

export const ConfirmWords = ({ wallet, onNext, onBack }: ConfirmWordsProps) => {
	const confirmWords = useMemo(() => {
		if (!wallet) {
			return
		}

		const words = wallet.mnemonic?.phrase.split(' ')
		const mappedWords = words.map((word, index) => ({
			word,
			number: index + 1,
		}))

		return shuffle(mappedWords)
			.slice(0, 4)
			.sort((a, b) => a.number - b.number)
	}, [wallet])

	const [valid, setValid] = useState<boolean[]>([])
	const setCorrect = (index: number, correct: boolean) => {
		const copy = [...valid]
		copy[index] = correct
		setValid(copy)
	}

	const canNext =
		confirmWords?.length &&
		valid.length === confirmWords.length &&
		valid.every((element) => !!element)

	const goNext = () => {
		if (!canNext) {
			return
		}

		onNext()
	}

	if (!confirmWords) {
		return <div>Error: no mnemonic</div>
	}

	return (
		<>
			<h1 class="text-3xl mb-8">Fill in the correct words.</h1>
			<a
				onClick={() => onBack()}
				className="mb-8 underline inline-block cursor-pointer"
			>
				I did not write down the words
			</a>
			{confirmWords.map(({ word, number }, index) => (
				<ConfirmWordInput
					word={word}
					number={number}
					onChange={(correct) => setCorrect(index, correct)}
				/>
			))}
			<button class="btn" onClick={goNext} disabled={!canNext}>
				Next
			</button>
		</>
	)
}
