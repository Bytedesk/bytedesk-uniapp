const DEBUG_STORAGE_KEY = 'BIZ_MESSAGE_CALLBACK_DEBUG'
const DEBUG_QUERY_KEYS = ['bizMessageCallbackDebug', 'bizCallbackDebug']
const LOG_PREFIX = '[biz-callback]'
const DEFAULT_DEBUG_ENABLED = true

function isTruthy(value) {
  if (!value) {
    return false
  }

  const normalized = String(value).trim().toLowerCase()
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on'
}

function isFalsy(value) {
  if (!value) {
    return false
  }

  const normalized = String(value).trim().toLowerCase()
  return normalized === '0' || normalized === 'false' || normalized === 'no' || normalized === 'off'
}

function resolveDebugFlag(value) {
  if (isTruthy(value)) {
    return true
  }

  if (isFalsy(value)) {
    return false
  }

  return null
}

function readQueryFlag(url) {
  if (!url) {
    return null
  }

  try {
    const parsed = new URL(String(url))
    for (const key of DEBUG_QUERY_KEYS) {
      const value = parsed.searchParams.get(key)
      if (value !== null) {
        return value
      }
    }
  } catch (error) {
    return null
  }

  return null
}

export function isBizMessageCallbackDebugEnabled(chatUrl) {
  const queryValue = readQueryFlag(chatUrl)
  if (queryValue !== null) {
    const queryFlag = resolveDebugFlag(queryValue)
    return queryFlag === null ? DEFAULT_DEBUG_ENABLED : queryFlag
  }

  try {
    const storedFlag = resolveDebugFlag(uni.getStorageSync(DEBUG_STORAGE_KEY))
    return storedFlag === null ? DEFAULT_DEBUG_ENABLED : storedFlag
  } catch (error) {
    return DEFAULT_DEBUG_ENABLED
  }
}

export function logBizMessageCallbackDebug(enabled, stage, detail) {
  if (!enabled) {
    return
  }

  console.log(`${LOG_PREFIX} ${stage}`, detail || {})
}

export function getBizMessageCallbackDebugMeta() {
  return {
    defaultEnabled: DEFAULT_DEBUG_ENABLED,
    storageKey: DEBUG_STORAGE_KEY,
    queryKeys: [...DEBUG_QUERY_KEYS]
  }
}