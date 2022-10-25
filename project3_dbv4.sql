-- mindex_filtered_commodities_df

DROP TABLE IF EXISTS mindex_filtered_commodities_df

CREATE TABLE mindex_filtered_commodities_df(
	"SITE_CODE" VARCHAR(10) PRIMARY KEY,
	"PROJ_CODE" VARCHAR(10),
    "TITLE" VARCHAR(70),
	"SUB_TYPE" VARCHAR(30),
	"STAGE" VARCHAR(25),
	"PROJECT_TITLE" VARCHAR(70),
	"LONGITUDE" double precision,
	"LATITUDE" double precision,
	"COMMODITIES" VARCHAR(40),
	"COMMODITY_GROUP_NAME" VARCHAR(30),
	"TARGET_GROUP_NAME" VARCHAR(30),
	"LGA_NAME" VARCHAR(70),
	"DISTRICT_NAME" VARCHAR(30),
	"TECTONIC_UNIT" VARCHAR(70)
-- 	CONSTRAINT fk_volume_mindex_filtered_commodities_df
--     FOREIGN KEY("PROJ_CODE") 
-- 	REFERENCES volume_mindex_filtered_commodities_df("PROJ_CODE")
);

SELECT *
FROM mindex_filtered_commodities_df;

--------------------------------------------------------------------------------------------

-- volume table

DROP TABLE IF EXISTS volume_mindex_filtered_commodities_df

CREATE TABLE volume_mindex_filtered_commodities_df(
    "PROJ_CODE" VARCHAR(10) PRIMARY KEY,
	"PROJ_NAME" VARCHAR(100),
	"PRI_P_COM" VARCHAR(50),
	"RES_QTY" VARCHAR(200),
	"TOT_MIN_RES_QUANTITY" VARCHAR(254),
	"RES_CON" VARCHAR(254),
	"TOT_MIN_RES_CONT_COM_UNIT" VARCHAR(254),
	"RES_ALT_CONT_COM" VARCHAR(254),
	"TOT_MIN_RES_ALT_CONT_COM_UNIT" VARCHAR(254)
);
	
	
SELECT *
FROM volume_mindex_filtered_commodities_df;