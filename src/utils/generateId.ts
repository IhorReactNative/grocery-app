export const generateId = () => {
  return String(Math.floor(Math.random() * Math.floor(Math.random() * Date.now())));
};
