package wol

import (
	"fmt"
	"net"
	"github.com/mdlayher/wol"
	"api/internal/app/api/pkg/ip"
)

func WakeOnLan(addr string, target string) error {
	macAddress, err := net.ParseMAC(target)
	if err != nil {
		return err
	}

	if ip.IsPrivateIP(net.ParseIP(addr)) {
		addr = "255.255.255.255"
	}
	fmt.Println(addr + ":9")

	client, err := wol.NewClient()
	if err != nil {
		return err
	}

	err = client.Wake(addr + ":9", macAddress)
	if err != nil {
		return err
	}
	return nil
}
