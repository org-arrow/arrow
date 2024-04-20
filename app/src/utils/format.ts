export const truncateAddress = (address: string, length = 4) => {
  if (!address) return ''
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export const formatEpochToDate = (epoch: number) => {
  const diffInDays = Math.floor(epoch / (60 * 60 * 24));
  
  if (diffInDays < 30) {
    return `${diffInDays}d`;
  } else {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}m`;
  }
}