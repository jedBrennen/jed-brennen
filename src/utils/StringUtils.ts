const getPlurality = (
  singular: string,
  count: number,
  plural?: string
): string => {
  if (count === 1) return `${count} ${singular}`;
  if (plural) return `${count} ${plural}`;

  const len = singular.length;
  if (singular.endsWith('y', len)) {
    return `${count} ${singular.substring(0, len - 1)}ies`;
  }

  return `${count} ${singular}s`;
};

export { getPlurality };
