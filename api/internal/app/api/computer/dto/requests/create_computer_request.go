package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"api/internal/app/api/computer/domain/entities"
)

type CreateComputerRequest struct {
	HostName   string `json:"host_name"`
	IPAddress  string `json:"ip_address"`
	MACAddress string `json:"mac_address"`
}

func (r *CreateComputerRequest) Validate() error {
	return validation.ValidateStruct(r,
		validation.Field(
			&r.HostName,
			validation.Required.Error("ホスト名は必須項目です"),
		),
		validation.Field(
			&r.IPAddress,
			validation.Required.Error("IPアドレスは必須項目です"),
			is.IP.Error("IPアドレスを入力して下さい"),
		),
		validation.Field(
			&r.MACAddress,
			validation.Required.Error("MACアドレスは必須項目です"),
			is.MAC.Error("MACアドレスを入力して下さい"),
		),
	)
}

func (r *CreateComputerRequest) ToEntity() *entities.Computer {
	return &entities.Computer{
		HostName: r.HostName,
		IPAddress: r.IPAddress,
		MACAddress: r.MACAddress,
	}
}
