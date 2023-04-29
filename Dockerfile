FROM node as frontend_build

WORKDIR /app/frontend

COPY frontend/package.json /app/frontend

RUN npm install

COPY frontend /app/frontend

WORKDIR /app/frontend

RUN npm run build:all-scripts-dev

FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt /app
COPY .env /app

RUN pip install --no-cache-dir -r requirements.txt

COPY backend /app/backend

# Copy built frontend assets from stage 1
COPY --from=frontend_build /app/frontend/js app/backend/catalog/static
COPY --from=frontend_build /app/frontend/styles app/backend/catalog/static

WORKDIR /app/backend

# Expose port
EXPOSE 8000

# Start server
CMD ["python", "manage.py", "runserver"]