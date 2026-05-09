const DEFAULT_COOLDOWN_MS = 1500

export function shouldSkipMiniProgramHostNavigation(event) {
  return Boolean(event && event.miniProgramDirectNavigateHandled)
}

function normalizeMessageType(value) {
  return String(value || '').trim().toUpperCase()
}

function stableStringify(value) {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value !== 'object') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`
  }

  const keys = Object.keys(value).sort()
  return `{${keys.map((key) => `${key}:${stableStringify(value[key])}`).join(',')}}`
}

export function createMessageNavigationKey(event) {
  if (!event || typeof event !== 'object') {
    return ''
  }

  const messageType = normalizeMessageType(event.type)
  if (!messageType) {
    return ''
  }

  const eventUid = String(event.uid || '').trim()
  if (eventUid) {
    return `${messageType}::${eventUid}`
  }

  return `${messageType}::${stableStringify(event.content)}`
}

export function createMessageNavigationGuard(options = {}) {
  const cooldownMs = Number(options.cooldownMs) > 0 ? Number(options.cooldownMs) : DEFAULT_COOLDOWN_MS
  const recentNavigations = new Map()

  return {
    shouldNavigate(event, now = Date.now()) {
      const navigationKey = createMessageNavigationKey(event)
      if (!navigationKey) {
        return true
      }

      const lastNavigationAt = recentNavigations.get(navigationKey)
      if (typeof lastNavigationAt !== 'number') {
        recentNavigations.set(navigationKey, now)
        return true
      }

      if (now - lastNavigationAt <= cooldownMs) {
        return false
      }

      recentNavigations.set(navigationKey, now)
      return true
    },
  }
}
