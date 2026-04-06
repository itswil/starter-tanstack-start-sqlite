import { createServerFn } from "@tanstack/react-start";
import { getAllUsers, createNewUser, deleteUser } from "./users.service.server";
import { deleteUserSchema, insertUserSchema } from "./users.schema";

export const getUsersFn = createServerFn().handler(async () => {
  return await getAllUsers();
});

export const addUserFn = createServerFn({ method: "POST" })
  .inputValidator(insertUserSchema)
  .handler(async ({ data }) => {
    return await createNewUser(data);
  });

export const deleteUserFn = createServerFn({ method: "POST" })
  .inputValidator(deleteUserSchema)
  .handler(async ({ data }) => {
    return await deleteUser(data);
  });
