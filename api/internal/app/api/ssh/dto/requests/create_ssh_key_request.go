package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"api/internal/app/api/ssh/domain/entities"
)

type CreateSshKeyRequest struct {
	ComputerID int    `json:"computer_id"`
	UserName   string `json:"user_name"`
	Port       int    `json:"port"`
}

func (r *CreateSshKeyRequest) Validate() error {
	return validation.ValidateStruct(r,
		validation.Field(
			&r.ComputerID,
			validation.Required.Error("コンピュータIDは必須項目です"),
			validation.Min(1).Error("不正なコンピュータIDです"),
		),
		validation.Field(
			&r.UserName,
			validation.Required.Error("ユーザ名は必須項目です"),
		),
		validation.Field(
			&r.Port,
			validation.Min(1).Error("不正なPortです"),
			validation.Max(65535).Error("不正なPortです"),
		),
	)
}

func (r *CreateSshKeyRequest) ToEntity() *entities.SshKey {
	return &entities.SshKey{
		ComputerID: r.ComputerID,
		UserName: r.UserName,
		Port: r.Port,
	}
}
