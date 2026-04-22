const CATEGORIES_URL = 'https://dummyjson.com/products/category-list';

export const fetchWorkPlaces = async (): Promise<string[]> => {
  const response = await fetch(CATEGORIES_URL);

  if (!response.ok) {
    throw new Error('Не удалось загрузить список мест работы');
  }

  const categories: unknown = await response.json();

  if (!Array.isArray(categories)) {
    throw new Error('Некорректный формат данных мест работы');
  }

  return categories.filter((item): item is string => typeof item === 'string');
};
