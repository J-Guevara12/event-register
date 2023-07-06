-- Table: public.USERS

-- DROP TABLE IF EXISTS public."USERS";

CREATE TABLE IF NOT EXISTS public."USERS"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "EMAIL" text COLLATE pg_catalog."default" NOT NULL,
    "NAME" text COLLATE pg_catalog."default" NOT NULL,
    "HASH" text COLLATE pg_catalog."default" NOT NULL,
    "SALT" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "USERS_pkey" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."USERS"
    OWNER to postgres;

-- Table: public.EVENTS

-- DROP TABLE IF EXISTS public."EVENTS";

CREATE TABLE IF NOT EXISTS public."EVENTS"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "USER_ID" integer NOT NULL,
    "DATE" timestamp without time zone NOT NULL,
    "NAME" text COLLATE pg_catalog."default" NOT NULL,
    "PLACE" text COLLATE pg_catalog."default" NOT NULL,
    "MODALITY" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "EVENTS_pkey" PRIMARY KEY ("ID"),
    CONSTRAINT "USER_ID_C" FOREIGN KEY ("USER_ID")
        REFERENCES public."USERS" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."EVENTS"
    OWNER to postgres;
