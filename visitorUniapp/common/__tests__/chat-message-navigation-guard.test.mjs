import assert from 'node:assert/strict'
import {
  createMessageNavigationGuard,
  createMessageNavigationKey,
  shouldSkipMiniProgramHostNavigation,
} from '../chat-message-navigation-guard.js'

const guard = createMessageNavigationGuard({ cooldownMs: 1500 })

const firstEvent = {
  uid: 'msg-goods-1',
  type: 'GOODS',
  content: { uid: 'goods-1', title: 'Test Goods' },
}

assert.equal(createMessageNavigationKey(firstEvent), 'GOODS::msg-goods-1')
assert.equal(shouldSkipMiniProgramHostNavigation(firstEvent), false)
assert.equal(
  shouldSkipMiniProgramHostNavigation({
    ...firstEvent,
    miniProgramDirectNavigateHandled: true,
  }),
  true,
)
assert.equal(guard.shouldNavigate(firstEvent, 1000), true)
assert.equal(guard.shouldNavigate(firstEvent, 1200), false)
assert.equal(
  guard.shouldNavigate(
    {
      uid: 'msg-goods-2',
      type: 'GOODS',
      content: { uid: 'goods-2', title: 'Another Goods' },
    },
    1200,
  ),
  true,
)
assert.equal(
  guard.shouldNavigate(
    {
      uid: 'msg-order-1',
      type: 'ORDER',
      content: { uid: 'order-1' },
    },
    1300,
  ),
  true,
)
assert.equal(guard.shouldNavigate(firstEvent, 2601), true)

console.log('chat-message-navigation-guard tests passed')
