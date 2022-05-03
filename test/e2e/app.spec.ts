import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { readFile, unlink } from 'fs/promises'
import path from 'path'
import { Wallet } from 'ethers'

// Utils
import { checkFileDownloaded } from '../utils'

// Types
import type { PreviewServer } from 'vite'
import type { Browser, Page } from 'puppeteer'

const port = 3142 // Unlike in life, where there is no such thing as free PI, servers usually don't run on it
const BASE_URL = `http://localhost:${port}`
const PAGES = {
	login: `${BASE_URL}/login`,
	createAccount: `${BASE_URL}/create-account`,
}

const downloadPath = path.join(__dirname, '/../data')
const walletPath = path.join(downloadPath, '/swarm-city-wallet.json')

const checkWallet = async (password: string) => {
	const walletContent = await readFile(walletPath, 'utf8')
	await Wallet.fromEncryptedJson(walletContent, password)
}

describe('app.tsx', () => {
	let server: PreviewServer
	let browser: Browser
	let page: Page

	beforeAll(async () => {
		server = await preview({ preview: { port } })
		browser = await puppeteer.launch()
		page = await browser.newPage()

		// Enable file downloads
		const client = await page.target().createCDPSession()
		await client.send('Page.setDownloadBehavior', {
			behavior: 'allow',
			downloadPath,
		})
	})

	afterAll(async () => {
		await browser.close()
		await new Promise((resolve) => server.httpServer.close(resolve))
	})

	test('should navigate to the create-account page', async () => {
		await page.goto(PAGES.login)
		const createAccountBtn = await page.waitForSelector(
			'a[href="/create-account"]'
		)
		await createAccountBtn.click()

		const createAccountBtnText = await createAccountBtn.evaluate(
			(el) => el.textContent
		)

		expect(createAccountBtnText).toBe('Create account')
		const url = page.url()
		expect(url).toEqual(PAGES.createAccount)
	})

	test('should go through the create-account flow', async () => {
		await page.goto(PAGES.createAccount)

		// Inputing in the username
		let headerElement = await page.waitForSelector('h1')
		let headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Choose a username and an avatar.')

		const usernameElement = await page.waitForSelector('input')
		await usernameElement.focus()
		const username = 'testusername'
		await page.keyboard.type(username)

		let nextButton = await page.waitForSelector('button')
		await nextButton.click()

		// Choose your password page with warning
		headerElement = await page.waitForSelector('h1')
		headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Choose a password.')

		nextButton = await page.waitForSelector('button')
		await nextButton.click()

		// Choose your password page with two inputs
		headerElement = await page.waitForSelector('h1')
		headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Choose a password.')

		const passwordInputElements = await page.$$('input')
		expect(passwordInputElements.length).toBe(2)

		const password = 'testpassword'
		for (let i = 0; i < passwordInputElements.length; i++) {
			const el = passwordInputElements[i]
			await el.focus()
			await page.keyboard.type(password)
		}

		nextButton = await page.waitForSelector('button')
		await nextButton.click()

		nextButton = await page.waitForSelector('button:not([disabled])')

		// Final page
		headerElement = await page.waitForSelector('h1')
		headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Great!')
		await nextButton.click()

		page.on('request', (request) => console.log(request))
		page.on('response', (response) => console.log(response))

		// Backup account
		headerElement = await page.waitForSelector('h1')
		headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Back up your account')

		// Delete downloaded wallet file
		try {
			await unlink(walletPath)
		} catch (_) {}

		nextButton = await page.waitForSelector('button')
		await nextButton.click()

		// Check automatic file download
		headerElement = await page.waitForSelector('h1')
		headerText = await headerElement.evaluate((el) => el.textContent)
		expect(headerText).toBe('Save the file in a safe location')

		await checkFileDownloaded(walletPath)
		await checkWallet(password)

		// Check forced file download
		await unlink(walletPath)
		const downloadButton = await page.waitForXPath(
			'//a[normalize-space() = "force download"]'
		)
		await downloadButton.click()

		await checkFileDownloaded(walletPath)
		await checkWallet(password)
	}, 30000)
})
