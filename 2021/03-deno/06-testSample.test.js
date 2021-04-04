import { sum } from './06-testSample.js'
import { assertEquals } from './06-deps.js'

Deno.test('Testing sum', () => {
    assertEquals(sum(1,2), 3)
})
