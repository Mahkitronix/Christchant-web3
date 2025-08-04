export const SONG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
  PENDING: 'pending',
}

export const SONG_STATUS_LABELS = {
  [SONG_STATUS.DRAFT]: 'Draft',
  [SONG_STATUS.PUBLISHED]: 'Published',
  [SONG_STATUS.REJECTED]: 'Rejected',
  [SONG_STATUS.PENDING]: 'Pending',
}

export const SONG_STATUS_COLORS = {
  [SONG_STATUS.DRAFT]: 'warning',
  [SONG_STATUS.PUBLISHED]: 'success',
  [SONG_STATUS.REJECTED]: 'danger',
  [SONG_STATUS.PENDING]: 'primary',
}
