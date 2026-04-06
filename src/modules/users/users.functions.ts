import { createServerFn } from "@tanstack/react-start";
import { getAllUsers, createNewUser } from "./users.service.server";
import { insertUserSchema } from "./users.schema";

export const getUsersFn = createServerFn().handler(async () => {
  return await getAllUsers();
});

export const addUserFn = createServerFn({ method: "POST" })
  .inputValidator(insertUserSchema)
  .handler(async ({ data }) => {
    return await createNewUser(data);
  });
