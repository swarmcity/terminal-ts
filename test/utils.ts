import { ElementHandle } from "puppeteer";

export async function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

export async function getProperty(element: ElementHandle, property: string): Promise<string> {
    return await (await element.getProperty(property)).jsonValue();
}
