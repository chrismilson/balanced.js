/**
 * A generic interface for a self balancing node.
 */
export interface RTNode<T> {
  data: T
  left?: RTNode<T>
  right?: RTNode<T>
}

/**
 * When given a root node for the tree matching `a` in
 *
 * ```
 * a
 *  \
 *   b
 *    \
 *     c
 * ```
 *
 * Calls `onRotate` on `a` and `b` (in that order). Then rotates the tree to
 *
 * ```
 *    b
 *  /   \
 * a     c
 * ```
 *
 * And returns the new root; `b`.
 *
 * If there is no right child on `a`, just returns `a` with no modification.
 *
 * @param a The node `a`
 * @param onRotate A callback that is called with the nodes `a` and `b`. Used
 * for
 * modifying balance data on the nodes.
 * @returns The node `b`
 */
export function singleLeft<T>(
  a: RTNode<T>,
  onRotate?: (a: RTNode<T>, b: RTNode<T>) => void
): RTNode<T> {
  if (a.right === undefined) return a
  const b = a.right

  if (onRotate !== undefined) {
    onRotate(a, b)
  }

  a.right = b.left
  b.left = a
  return b
}

/**
 * When given a root node for the tree matching `c` in
 *
 * ```
 *     c
 *    /
 *   b
 *  /
 * a
 * ```
 *
 * Calls the `onRotate` function (if defined) on `b` and `c` (in that order).
 * Then rotates the tree to
 *
 * ```
 *    b
 *  /   \
 * a     c
 * ```
 *
 * And returns the node `b`.
 *
 * If there is no left child on `c`, just returns `c` with no modification.
 *
 * @param c The root of the original tree
 * @param onRotate A callback that is called with the nodes `b` and `c`. Used for
 * modifying balance data on the nodes.
 * @returns The node b
 */
export function singleRight<T>(
  c: RTNode<T>,
  onRotate?: (c: RTNode<T>, b: RTNode<T>) => void
): RTNode<T> {
  if (c.left === undefined) return c
  const b = c.left

  if (onRotate !== undefined) {
    onRotate(b, c)
  }

  c.left = b.right
  b.right = c
  return b
}

/**
 * When given a root node for a tree matching `a` in
 *
 * ```
 * a
 *  \
 *   c
 *  /
 * b
 * ```
 *
 * First rotates the subtree rooted at `c` right, and then rotates the resultant
 * tree left at `a` to get
 *
 * ```
 *    b
 *  /   \
 * a     c
 * ```
 *
 * Both rotations will call the respective `onRight` and `onLeft` callbacks on
 * `b` `c` and `a` `b` respectively.
 *
 * @see [[singleLeft]]
 * @see [[singleRight]]
 *
 * @param a The root node that will be rotated
 * @param onLeft [[singleLeft]]
 * @param onRight [[singleRight]]
 * @returns The node b
 */
export function doubleLeft<T>(
  a: RTNode<T>,
  onLeft?: (a: RTNode<T>, b: RTNode<T>) => void,
  onRight?: (c: RTNode<T>, b: RTNode<T>) => void
): RTNode<T> {
  if (a.right === undefined) return a
  a.right = singleRight(a.right, onRight)
  return singleLeft(a, onLeft)
}

/**
 * When given the root node for a tree matching `c` in
 *
 * ```
 *   c
 *  /
 * a
 *  \
 *   b
 * ```
 * First rotates the subtree rooted at `a` left, and then rotates the resultant
 * tree right at `c` to get
 *
 *
 * ```
 *    b
 *  /   \
 * a     c
 * ```
 *
 * Both rotations will call the respective `onLeft` and `onRight` callbacks on
 * `a` `b` and `b` `c` respectively.
 *
 * @see [[singleLeft]]
 * @see [[singleRight]]
 *
 * @param c The root node that will be rotated
 * @param onLeft [[singleLeft]]
 * @param onRight [[singleRight]]
 * @returns The node b
 */
export function doubleRight<T>(
  c: RTNode<T>,
  onLeft?: (a: RTNode<T>, b: RTNode<T>) => void,
  onRight?: (c: RTNode<T>, b: RTNode<T>) => void
): RTNode<T> {
  if (c.left === undefined) return c
  c.left = singleLeft(c.left, onLeft)
  return singleRight(c, onRight)
}

/**
 * Returns an api to the methods in this module with set `onLeft` and `onRight`
 * methods.
 *
 * @param onLeft The function to call on nodes before they are rotated left
 * @param onRight The function to call on nodes before they are rotated right.
 */
export function useRotatingTree<T>(
  onLeft: (a: RTNode<T>, b: RTNode<T>) => void,
  onRight: (c: RTNode<T>, b: RTNode<T>) => void
): {
  singleLeft(a: RTNode<T>): RTNode<T>
  singleRight(c: RTNode<T>): RTNode<T>
  doubleLeft(a: RTNode<T>): RTNode<T>
  doubleRight(c: RTNode<T>): RTNode<T>
} {
  return {
    singleLeft(a: RTNode<T>) {
      return singleLeft(a, onLeft)
    },
    singleRight(c: RTNode<T>) {
      return singleRight(c, onRight)
    },
    doubleLeft(a: RTNode<T>) {
      return doubleLeft(a, onLeft, onRight)
    },
    doubleRight(c: RTNode<T>) {
      return doubleRight(c, onLeft, onRight)
    },
  }
}
