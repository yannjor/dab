FROM python:3.10.8-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 3000

ENTRYPOINT ["python"]

CMD ["main.py"]
