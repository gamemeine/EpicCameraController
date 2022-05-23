export const validPlate = (plate) => {
  if (plate.startsWith("ZMIANA")) return false;
  if (plate.startsWith("WOLNE")) return false;
  if (plate.startsWith("SZKOLENIE")) return false;
  if (plate.startsWith("ŚMIECI")) return false;

  return true;
};
