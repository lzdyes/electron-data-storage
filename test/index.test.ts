import storage from '../src'

test('test async set string', async () => {
  await storage.set('a', 'Hello World!')
})

test('test async set number', async () => {
  await storage.set('b', 2021)
})

test('test async set boolean', async () => {
  await storage.set('c', true)
})

test('test async get string', async () => {
  const a = await storage.get('a')
  expect(a).toBe('Hello World!')
})

test('test async get number', async () => {
  const b = await storage.get('b')
  expect(b).toBe(2021)
})

test('test async get boolean', async () => {
  const c = await storage.get('c')
  expect(c).toBeTruthy()
})

test('test async get undefined value', async () => {
  const d = await storage.get('d')
  expect(d).toBeUndefined()
})

test('test sync get string', () => {
  const a = storage.getSync('a')
  expect(a).toBe('Hello World!')
})

test('test sync get number', () => {
  const b = storage.getSync('b')
  expect(b).toBe(2021)
})

test('test sync get boolean', () => {
  const c = storage.getSync('c')
  expect(c).toBeTruthy()
})

test('test sync get undefined value', () => {
  const d = storage.getSync('d')
  expect(d).toBeUndefined()
})

test('test async remove', async () => {
  await storage.remove('a')
  const a = await storage.get('a')
  expect(a).toBeUndefined()
})

test('test async clear', async () => {
  await storage.clear()
  const b = await storage.get('b')
  expect(b).toBeUndefined()
})
