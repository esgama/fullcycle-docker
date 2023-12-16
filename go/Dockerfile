FROM golang AS builder

WORKDIR /go/src

COPY ./cmd .

RUN go build main.go

FROM scratch

WORKDIR /

COPY --from=builder /go/src/main .

CMD ["./main"]






