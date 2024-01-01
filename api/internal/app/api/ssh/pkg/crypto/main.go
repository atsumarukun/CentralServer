package crypto

import (
	"crypto/rsa"
	"crypto/rand"
	"crypto/x509"
	"encoding/pem"
	"golang.org/x/crypto/ssh"
)

type SshKey struct {
	PrivateKey string
	PublicKey  string
}

func SshKeyGen() (*SshKey, error) {
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		return nil, err
	}
	privateKeyPem := pem.EncodeToMemory(&pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(privateKey)})

	publicKey, err := ssh.NewPublicKey(&privateKey.PublicKey)
	if err != nil {
		return nil, err
	}

	publicKeyPem := ssh.MarshalAuthorizedKey(publicKey)

	return &SshKey{ PrivateKey: string(privateKeyPem), PublicKey: string(publicKeyPem) }, nil
}
