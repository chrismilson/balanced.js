import { RTNode } from '.'

/**
 * Returns a deep copy of a weight balanced tree.
 */
export function deepCopy(root: undefined): undefined
export function deepCopy<N extends RTNode<unknown>>(root: N): N
export function deepCopy<T>(root: RTNode<T> | undefined): RTNode<T> | undefined
export function deepCopy<T>(
  root: RTNode<T> | undefined
): RTNode<T> | undefined {
  return (
    root && {
      ...root,
      left: deepCopy(root.left),
      right: deepCopy(root.right),
    }
  )
}

export const rightHeavy = Object.freeze({
  data: 'a',
  right: {
    data: 'b',
    right: {
      data: 'c',
    },
  },
})
export const leftHeavy = Object.freeze({
  data: 'c',
  left: {
    data: 'b',
    left: {
      data: 'a',
    },
  },
})
export const rightMiddleHeavy = Object.freeze({
  data: 'a',
  right: {
    data: 'c',
    left: {
      data: 'b',
    },
  },
})
export const leftMiddleHeavy = Object.freeze({
  data: 'c',
  left: {
    data: 'a',
    right: {
      data: 'b',
    },
  },
})
export const balanced = Object.freeze({
  data: 'b',
  left: { data: 'a' },
  right: { data: 'c' },
})
