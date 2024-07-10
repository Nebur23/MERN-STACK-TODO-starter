import joi from "joi";
export const register = data => {
  const schema = joi.object({
    name: joi.string().min(2).required(),
    password: joi.string().min(5).required(),
    email: joi.string().email().required(),
  });
  return schema.validate(data);
};
export const login = data => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
  });
  return schema.validate(data);
};
// export const update=(data)=>{
//     const schema=joi.object({
//         email:joi.string().email().required(),
//         password: joi.string().min(5).required()

//     })
//     return schema.validate(data)
//}
