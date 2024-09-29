export const makeSkeletonList = (length: number, id: string = 'skeleton') => {
  return Array.from({ length }, (_, index) => {
    return {
      id: `${id}-${index}`,
    }
  })
}
