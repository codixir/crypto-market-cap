export const sort = (list, sortBy, sortOrder) => {
  if (Array.isArray(list)) {
    list.sort((a, b) => {
      if (!sortBy || !sortBy.length) {
        return sortOrder === 'asc' ? a - b: b - a;
      } else {
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy]: b[sortBy] - a[sortBy];
      }      
    });
  }

  return list;
}