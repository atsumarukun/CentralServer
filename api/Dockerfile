FROM golang:1.20-alpine as build
COPY . /go/src/api
WORKDIR /go/src/api/cmd/api
RUN go build

FROM golang:1.20-alpine as exec
COPY --from=build /go/src/api/cmd/api /go/src/api/cmd/api
COPY ./.env /go/src/api/.env
WORKDIR /go/src/api/cmd

CMD ["./api/api"]