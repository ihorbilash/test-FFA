# app description

# Install Docker

Download and install Docker.

# Clone the project

git clone https://github.com/ihorbilash/test-FFA.git

# env & docker

- add .env (.env.test)
- docker compose -f docker-compose.yml up -d

# Install and Run

- npm install
- npm run prisma:generate
- npm run prisma:push
- npm run start:dev:all

# Swagger

Access Swagger documentation API:

http://localhost:3000/api/docs

POST /requests – створює заявку з текстом і статусом new
GET /requests – повертає всі заявки
