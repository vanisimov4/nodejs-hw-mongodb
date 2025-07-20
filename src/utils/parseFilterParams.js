const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

// const parseFavourite = (favourite) => {
//   const isBoolean = typeof number === 'string';
//   if (!isBoolean) return;

//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) {
//     return;
//   }

//   return parsedNumber;
// };

export const parseFilterParams = (query) => {
  const { type } = query; //, maxAge, minAge, maxAvgMark, minAvgMark

  const parsedType = parseType(type);
  //   const parsedMaxAge = parseNumber(maxAge);
  //   const parsedMinAge = parseNumber(minAge);
  //   const parsedMaxAvgMark = parseNumber(maxAvgMark);
  //   const parsedMinAvgMark = parseNumber(minAvgMark);

  return {
    type: parsedType,
    // maxAge: parsedMaxAge,
    // minAge: parsedMinAge,
    // maxAvgMark: parsedMaxAvgMark,
    // minAvgMark: parsedMinAvgMark,
  };
};
