package crypto

import (
	"fmt"
	"golang.org/x/crypto/ssh"
)

func RunSshCommand(hostName string, port int, userName string, privateKey string, command string) error {
	publicKeyPem, err := ssh.ParsePrivateKey([]byte(privateKey)); if err != nil {
		return err
	}

	conf := &ssh.ClientConfig{
		User: userName,
		Auth: []ssh.AuthMethod{
			ssh.PublicKeys(publicKeyPem),
    },
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	client, err := ssh.Dial("tcp", fmt.Sprintf("%s:%d", hostName, port), conf)
	if err != nil {
		return err
	}

	session, err := client.NewSession()
	if err != nil {
		return err
	}
	defer session.Close()

	return session.Run(command)
}
