import { ElementHandle } from 'puppeteer'
import { access } from 'fs/promises'
import { constants } from 'fs'

export async function sleep(ms: number): Promise<void> {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), ms))
}

export async function getProperty(
	element: ElementHandle,
	property: string
): Promise<string> {
	return await (await element.getProperty(property)).jsonValue()
}

export async function checkFileDownloaded(
	path: string,
	tries = 3,
	interval = 1000
): Promise<void> {
	for (let i = 0; ; i++) {
		try {
			await access(path, constants.F_OK)
			break
		} catch (_) {
			if (i === tries - 1) {
				throw new Error('file not downlaoded')
			}
			await sleep(interval)
		}
	}
}
