/**
 * Attempts to launch the MiniPay app on mobile,
 * pointing it at this DApp's current URL.
 */
export function openInMiniPay() {
  if (typeof window === 'undefined') return // Guard for non-browser environments

  const dappUrl    = window.location.href
  const encodedUrl = encodeURIComponent(dappUrl)
  const deepLink   = `minipay://dapp?url=${encodedUrl}`

  console.log('Attempting to navigate to deep link:', deepLink);

  // Attempt to navigate to the deep link
  window.location.href = deepLink
} 