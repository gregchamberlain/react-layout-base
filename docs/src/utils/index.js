const getColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

export const createItem = type => ({
  type: type || 'div',
  props: {
    style: { minHeight: 40, margin: 5, padding: 5, background: getColor() }
  },
  children: []
});