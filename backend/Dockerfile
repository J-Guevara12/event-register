FROM python AS builder

WORKDIR /code

COPY . /code

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

ENV FLASK_APP server.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0
ENV POSTGRES_PW databasePassword 

EXPOSE 8000

CMD ["flask","run","--debug"]
