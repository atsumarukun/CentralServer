import { z } from "zod";

export const computerFormShema = z.object({
  host_name: z.string().min(1, "必須項目です."),
  ip_address: z.string().min(1, "必須項目です.").ip("入力項目に誤りがあります."),
  mac_address: z.string().min(1, "必須項目です."),
});
export type ComputerFormShema = z.infer<typeof computerFormShema>;
