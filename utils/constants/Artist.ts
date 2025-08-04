export const ARTIST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
  PENDING: 'pending',
}

export const ARTIST_STATUS_LABELS = {
  [ARTIST_STATUS.DRAFT]: 'Draft',
  [ARTIST_STATUS.PUBLISHED]: 'Published',
  [ARTIST_STATUS.REJECTED]: 'Rejected',
  [ARTIST_STATUS.PENDING]: 'Pending',
}

export const ARTIST_STATUS_COLORS = {
  [ARTIST_STATUS.DRAFT]: 'warning',
  [ARTIST_STATUS.PUBLISHED]: 'success',
  [ARTIST_STATUS.REJECTED]: 'danger',
  [ARTIST_STATUS.PENDING]: 'primary',
}
