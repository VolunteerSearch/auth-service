FROM node:20

WORKDIR /opt/VolunteerSearch/auth-service

COPY *.json /

RUN npm install --omit=dev

COPY src /src


CMD [ "npm", "start" ]