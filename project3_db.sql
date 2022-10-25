-- mindex_filtered_commodities_df

DROP TABLE IF EXISTS mindex_filtered_commodities_df

CREATE TABLE mindex_filtered_commodities_df(
);


ALTER TABLE IF EXISTS public.mindex_filtered_commodities_df
	ADD COLUMN "SITE_CODE" VARCHAR(10) PRIMARY KEY,
	ADD COLUMN "PROJ_CODE" VARCHAR(10),
    ADD COLUMN "TITLE" VARCHAR(70),
	ADD COLUMN "SUB_TYPE" VARCHAR(30),
	ADD COLUMN "STAGE" VARCHAR(25),
	ADD COLUMN "PROJECT_TITLE" VARCHAR(70),
	ADD COLUMN "LONGITUDE" double precision,
	ADD COLUMN "LATITUDE" double precision,
	ADD COLUMN "COMMODITIES" VARCHAR(40),
	ADD COLUMN "COMMODITY_GROUP_NAME" VARCHAR(30),
	ADD COLUMN "TARGET_GROUP_NAME" VARCHAR(30),
	ADD COLUMN "LGA_NAME" VARCHAR(70),
	ADD COLUMN "DISTRICT_NAME" VARCHAR(30),
	ADD COLUMN "TECTONIC_UNIT" VARCHAR(70);
	CONSTRAINT fk_volume_mindex_filtered_commodities_df
      FOREIGN KEY(PROJ_CODE) 
	  REFERENCES volume_mindex_filtered_commodities_df(PROJ_CODE)


SELECT *
FROM mindex_filtered_commodities_df;

--------------------------------------------------------------------------------------------

-- volume table

DROP TABLE IF EXISTS volume_mindex_filtered_commodities_df

CREATE TABLE volume_mindex_filtered_commodities_df(
);


ALTER TABLE IF EXISTS public.volume_mindex_filtered_commodities_df
    ADD COLUMN "PROJ_CODE" VARCHAR(10) PRIMARY KEY,
	ADD COLUMN "PROJ_NAME" VARCHAR(100),
	ADD COLUMN "PRI_P_COM" VARCHAR(50),
	ADD COLUMN "RES_QTY" VARCHAR(200),
	ADD COLUMN "TOT_MIN_RES_QUANTITY" VARCHAR(254),
	ADD COLUMN "RES_CON" VARCHAR(254),
	ADD COLUMN "TOT_MIN_RES_CONT_COM_UNIT" VARCHAR(254),
	ADD COLUMN "RES_ALT_CONT_COM" VARCHAR(254),
	ADD COLUMN "TOT_MIN_RES_ALT_CONT_COM_UNIT" VARCHAR(254);

SELECT *
FROM volume_mindex_filtered_commodities_df;