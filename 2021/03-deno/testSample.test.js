import { sum } from './testSample.js'
import { assertEquals } from 'https://deno.land/std@0.87.0/testing/asserts.ts'

Deno.test('Testing sum', () => {
    assertEquals(sum(1,2), 3)
})
