import joi from "joi";
export const register = data => {
  const schema = joi.object()
  return schema.validate(data);
};
export const login = data => {
  const schema = joi.object();
  return schema.validate(data);
};

