BASE_DIR = $(shell pwd)
DATA_DIR = $(BASE_DIR)/var/data
DATASOURCE = $(DATA_DIR)/proxy.db
SCHEMAFILE = $(BASE_DIR)/etc/schema/db-schema.sql


install: init-packages init-proxystore


init-packages: ./node_modules/
	
node-modules/:
	npm install


init-proxystore: $(DATASOURCE)

$(DATASOURCE):
	sqlite3 $(DATASOURCE) < $(SCHEMAFILE)


