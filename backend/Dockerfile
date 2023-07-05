FROM python AS builder

WORKDIR /code

COPY . /code

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

ARG JWT_SECRET_KEY_ARG
ARG POSTGRES_PASSWORD_ARG

ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0
ENV POSTGRES_PW $POSTGRES_PASSWORD_ARG 
ENV JWT_SECRET_KEY $JWT_SECRET_KEY_ARG

EXPOSE 8000

CMD ["gunicorn","-w","4","-b","0.0.0.0","app:app"]
