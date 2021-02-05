import { doubleLeft, doubleRight, singleLeft, singleRight } from '..'
import {
  balanced,
  deepCopy,
  leftHeavy,
  leftMiddleHeavy,
  rightHeavy,
  rightMiddleHeavy,
} from '../common'

describe('balancing tree', () => {
  describe.each([
    ['single left', deepCopy(rightHeavy), singleLeft],
    ['single right', deepCopy(leftHeavy), singleRight],
    ['double left', deepCopy(rightMiddleHeavy), doubleLeft],
    ['double right', deepCopy(leftMiddleHeavy), doubleRight],
  ])('%s', (_name, root, remedy) => {
    const result = remedy(root)

    it('Should rotate right', () => {
      expect(result).toMatchObject(balanced)
    })
  })
})
