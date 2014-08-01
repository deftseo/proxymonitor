
--
-- Proxy
--

CREATE TABLE IF NOT EXISTS `proxy` (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ipAddress   VARCHAR(15),
    port        INTEGER,
    country     VARCHAR(32),
    status      VARCHAR(1),

    dateAdded   DATETIME,
    dateUpdated DATETIME,

    testHistory VARCHAR(255),

    testCount   INTEGER,
    totalPass   INTEGER,
    totalFail   INTEGER,
    totalError  INTEGER,

    UNIQUE (ipAddress, port)
);

CREATE INDEX IF NOT EXISTS `proxy_ip`     ON `proxy` (ipAddress);
CREATE INDEX IF NOT EXISTS `proxy_fresh`  ON `proxy` (status, country);
CREATE INDEX IF NOT EXISTS `proxy_update` ON `proxy` (status, dateUpdated);

