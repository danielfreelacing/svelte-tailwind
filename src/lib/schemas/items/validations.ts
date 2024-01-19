import * as yup from 'yup';

export const addMenuSchema = yup.object({
  placeId: yup.string(),
  name: yup.string().min(1, { message: "Menu name missing" }),
  position: yup.number(),
  seasonalFrom: yup.string().optional(),
  seasonalTo: yup.string().optional(),
  timeFrom: yup.string().optional(),
  timeTo: yup.string().optional(),
  daysFilter: yup.array()
});

export const addCategorySchema = yup.object({ 
  menuId: yup.string(),
  name: yup.string().min(1, { message: "Category name missing" }),
  position: yup.number(),
  isAvailable: yup.boolean(),
  placeId: yup.string()
});
