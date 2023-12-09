export const isObject = (v) => typeof v === "object" && v !== null;

export const isNumber = (value) => String(Number(value)) === String(value);

export const isString = (value) => {
  if (isNumber(value)) return false;
  switch (String(value).toLowerCase()) {
    case "true":
    case "false":
    case "null":
      return false;
    default:
      return true;
  }
};
