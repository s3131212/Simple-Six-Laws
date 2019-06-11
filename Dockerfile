FROM node:alpine

WORKDIR /app
ADD . /app
RUN apk --no-cache add git ca-certificates
RUN update-ca-certificates

RUN git clone https://github.com/kong0107/mojLawSplitJSON
WORKDIR /app/mojLawSplitJSON
RUN git pull

WORKDIR /app/law-generator
RUN node /app/law-generator/law-gen.js /app/mojLawSplitJSON/FalVMingLing

WORKDIR /app
RUN npm i .
RUN npm update caniuse-lite browserslist
RUN npm run-script build
CMD ["/bin/sh", "-c", "export PORT=3000 && npm start"]
EXPOSE 3000
