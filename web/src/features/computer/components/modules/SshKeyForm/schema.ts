import { z } from "zod";

export const sshKeyFormShema = z.object({
  user_name: z.string().min(1, "必須項目です."),
  port: z.preprocess(
    (v) => (!v || v === "" ? undefined : Number(v)),
    z
      .number({ invalid_type_error: "数値を入力してください." })
      .min(1, "不正な値です.")
      .max(65535, "不正な値です.")
  ),
});
export type SshKeyFormShema = z.infer<typeof sshKeyFormShema>;
