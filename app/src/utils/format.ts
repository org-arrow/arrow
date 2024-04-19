export const truncateAddress = (address: string, length = 4) => {
  if (!address) return ''
  return `${address.slice(0, length)}...${address.slice(-length)}`
}
