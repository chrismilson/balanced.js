# `rotating-tree.js`

A simple generic module that allows the manipulation of binary tree nodes via
four rotation methods:

- single left (AVL "LL" rotation)
- single right (AVL "RR" rotation)
- double left (AVL "LR" rotation)
- double right (AVL "RL" rotation)

## Installation

Just install it with your favourite package manager!

### `yarn`

```bash
yarn add @shlappas/rotating-tree
```

### `npm`

```bash
npm install @shlappas/rotating-tree
```

## Usage

Set up a simple binary tree:

```js
// a
//  \
//   b
//    \
//     c
const bst = {
  data: 1,
  right: {
    data: 2,
    right: {
      data: 3
    }
  }
}
```

Rotate your bst with the included methods. For example, we could balance our bst from before:

```js
//   b
//  / \
// a   c
// Note: this mutates the original tree; the object `bst` is now { data: 1 }.
const root = singleLeft(bst)
```
