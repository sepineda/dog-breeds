FROM node:alpine

WORKDIR /src
  
COPY . /src
  
RUN npm install --only=production --no-optional
  
EXPOSE  3000
 
RUN npm run build
EXPOSE 3000
CMD npm run start
