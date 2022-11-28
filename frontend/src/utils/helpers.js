export const truncateText = (text, end) => text.split(' ').slice(0, end).join(' ') + ' ...'

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);