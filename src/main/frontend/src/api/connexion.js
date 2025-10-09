export const development = () => {
  return import.meta.env.VITE_APP_DEVELLOPMENT;
};

export const production = () => {
  return import.meta.env.VITE_APP_PRODUCTION;
  };
