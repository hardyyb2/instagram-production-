export const objectToFormData = (obj: any) => {
  const fData = new FormData()
  Object.keys(obj).forEach((key) => fData.append(key, obj[key]))

  return fData
}

export const checkIfFilesAreTooBig = (file: File): boolean => {
  let valid = true
  const size = file.size / 1024 / 1024
  if (size > 2) {
    valid = false
  }
  return valid
}

export const checkIfFilesAreCorrectType = (file: File): boolean => {
  let valid = true
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    valid = false
  }

  return valid
}

export const timeDifference = (previous: number): string => {
  const current = Date.now()
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago'
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago'
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago'
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago'
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago'
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago'
  }
}
