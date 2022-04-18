import { shuffle } from '../../../src/lib/tools'

describe('shuffle', () => {
    const testArray = [1,2,3,4,5,6]

    it('should return the whole array shuffled', () => {
        const res = shuffle(testArray)

        expect(res).toHaveLength(testArray.length)
        expect(res).toEqual(expect.arrayContaining(testArray))
    })

    it('should return just 3 random elements', () => {
        const length = 3
        const res = shuffle(testArray, length)

        expect(res).toHaveLength(length)
        expect(testArray).toEqual(expect.arrayContaining(res))
    })
})