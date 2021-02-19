import { sum } from './testSample.js'
import { assertEquals } from './deps.js'

Deno.test('Testing sum', () => {
    assertEquals(sum(1,2), 5)
})
