FROM python

WORKDIR /app

COPY requirements.txt /app
# COPY .env /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# Expose port
EXPOSE 8000

# Start server
CMD python manage.py makemigrations; python manage.py migrate; python manage.py collectstatic; python manage.py runserver 0.0.0.0:8000;
# CMD ["python", "manage.py", "runserver"] 