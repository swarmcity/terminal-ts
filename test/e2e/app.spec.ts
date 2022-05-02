import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { preview } from 'vite'
import type { PreviewServer } from 'vite'
import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

import { getProperty } from '../utils'

const port = 3142 // Unlike in life, where there is no such thing as free PI, servers usually don't run on it
const BASE_URL = `http://localhost:${port}`
const PAGES = {
	login: `${BASE_URL}/login`,
	createAccount: `${BASE_URL}/create-account`,
}

describe('app.tsx', () => {
	let server: PreviewServer
	let browser: Browser
	let page: Page

	beforeAll(async () => {
		server = await preview({ preview: { port } })
		browser = await puppeteer.launch()
		page = await browser.newPage()
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
			const el = passwordInputElements[0]
			await el.focus()
			await page.keyboard.type(password)
		}

		nextButton = await page.waitForSelector('button')
		await nextButton.click()

		// TODO: The encoding of the password takes ages, there must be better mechanism to test this
		// await sleep(25000)

		// // Final page
		// headerElement =  await page.waitForSelector("h1");
		// headerText = await headerElement.evaluate(el => el.textContent)
		// expect(headerText).toBe('Great!')
	}, 30000)
})
