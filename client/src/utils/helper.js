
export const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};



export const getInitialsFromEmail = email => {
  if (!email) return "";

  // Extract the part before the "@" symbol
  const namePart = email.split("@")[0];

  // Get the first two letters from the namePart
  const initials = namePart.slice(0, 2);

  return initials.toUpperCase();
};
