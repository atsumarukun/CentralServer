export type SshKey = {
  id: number,
  user_name: string,
  created_at: number,
  updated_at: number,
  computer_id: number,
}

export type Computer = {
  id: number,
  host_name: string,
  ip_address: string,
  mac_address: string,
  running: boolean | null,
  created_at: number,
  updated_at: number,
  ssh_keys?: SshKey[],
}
