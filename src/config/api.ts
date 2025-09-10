// Ecwid API Configuration
export const ECWID_CONFIG = {
  storeId: '108362264',
  publicToken: 'public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
  baseUrl: 'https://app.ecwid.com/api/v3'
} as const

// Construct the API URL for this store
export const getApiUrl = (endpoint: string): string => {
  return `${ECWID_CONFIG.baseUrl}/${ECWID_CONFIG.storeId}/${endpoint}`
}

// Common headers for API requests
export const getHeaders = () => ({
  'Authorization': `Bearer ${ECWID_CONFIG.publicToken}`,
  'Content-Type': 'application/json'
})
