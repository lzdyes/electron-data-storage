import storage from '../src'

test('test set string', () => {
  storage.set('a', 'Hello World!')
})

test('test set number', () => {
  storage.set('b', 2021)
})

test('test set boolean', () => {
  storage.set('c', true)
})

test('test get string', () => {
  const a = storage.get('a')
  expect(a).toBe('Hello World!')
})

test('test get number', () => {
  const b = storage.get('b')
  expect(b).toBe(2021)
})

test('test get boolean', () => {
  const c = storage.get('c')
  expect(c).toBeTruthy()
})

test('test get undefined value', () => {
  const d = storage.get('d')
  expect(d).toBeUndefined()
})

test('test remove', () => {
  storage.remove('a')
  const a = storage.get('a')
  expect(a).toBeUndefined()
})

test('test clear', () => {
  storage.clear()
  const b = storage.get('b')
  expect(b).toBeUndefined()
})
