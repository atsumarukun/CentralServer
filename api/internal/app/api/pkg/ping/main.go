package ping

import (
	"time"
	"github.com/go-ping/ping"
)

func Send(addr string) (*ping.Statistics, error) {
	pinger, err := ping.NewPinger(addr)
	if err != nil {
		return nil, err
	}

	timeout, err := time.ParseDuration("1s")
	if err != nil {
		return nil, err
	}
	pinger.Timeout = timeout

	pinger.Run()
	return pinger.Statistics(), nil
}
