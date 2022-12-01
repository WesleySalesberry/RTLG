export const truncateText = (text, end) => text.split(' ').slice(0, end).join(' ') + ' ...'

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const filterLanguages = (data) => {
  
  return data.map((itm) => itm.language)
                      .flat(1)
                      .filter((value, index, self) => self.indexOf(value) === index).sort();
}