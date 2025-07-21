const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;

  const lower = favourite.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;

  return;
};

export const parseFilterParams = (query) => {
  const { type, favourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseFavourite(favourite);

  return {
    type: parsedType,
    favourite: parsedFavourite,
  };
};
