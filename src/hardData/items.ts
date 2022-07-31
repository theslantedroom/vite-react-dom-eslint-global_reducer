export const gameItems = [
  {
    id: 'item not found',
    name: 'item not found',
    description: 'item not found',
    price: 0,
    quantity: 0,
    image: 'https://picsum.photos/200/300?image=1',
    category: '1',
  },
  {
    id: 'bandage',
    name: 'bandage',
    description: 'bandage',
    price: 1,
    quantity: 1,
    image: 'https://picsum.photos/200/300?image=1',
    category: '1',
  },
];

export const getItemById = (id: string) => {
  console.log('id', id);
  const found = gameItems.find((item) => item.id === id);
  return found || gameItems[0];
};
