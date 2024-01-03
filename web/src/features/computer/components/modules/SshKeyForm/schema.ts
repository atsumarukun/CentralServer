import { z } from "zod";

export const sshKeyFormShema = z.object({
  user_name: z.string().min(1, "必須項目です."),
});
export type SshKeyFormShema = z.infer<typeof sshKeyFormShema>;
