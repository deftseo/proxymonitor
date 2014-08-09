
--
-- Proxy
--

CREATE TABLE IF NOT EXISTS `proxy` (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ipAddress       VARCHAR(15),
    port            INTEGER,
    country         VARCHAR(32),
    status          VARCHAR(1),

    dateAdded       DATETIME,
    dateUpdated     DATETIME,

    testHistory     VARCHAR(255),

    testCount       INTEGER,
    totalPass       INTEGER,
    totalFail       INTEGER,
    totalError      INTEGER,
    totalTimeout    INTEGER,

    UNIQUE (ipAddress, port)
);

CREATE INDEX IF NOT EXISTS `proxy_ip`     ON `proxy` (ipAddress);
CREATE INDEX IF NOT EXISTS `proxy_fresh`  ON `proxy` (status, country);
CREATE INDEX IF NOT EXISTS `proxy_update` ON `proxy` (status, dateUpdated);


--
-- Country codes
--

CREATE TABLE IF NOT EXISTS `country` (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    country         VARCHAR(255),
    code2           VARCHAR(2) UNIQUE,
    code3           VARCHAR(3) UNIQUE
);

INSERT INTO `country` VALUES(NULL, 'Afghanistan', 'AF', 'AFG');
INSERT INTO `country` VALUES(NULL, 'Åland Islands', 'AX', 'ALA');
INSERT INTO `country` VALUES(NULL, 'Albania', 'AL', 'ALB');
INSERT INTO `country` VALUES(NULL, 'Algeria', 'DZ', 'DZA');
INSERT INTO `country` VALUES(NULL, 'American Samoa', 'AS', 'ASM');
INSERT INTO `country` VALUES(NULL, 'Andorra', 'AD', 'AND');
INSERT INTO `country` VALUES(NULL, 'Angola', 'AO', 'AGO');
INSERT INTO `country` VALUES(NULL, 'Anguilla', 'AI', 'AIA');
INSERT INTO `country` VALUES(NULL, 'Antarctica', 'AQ', 'ATA');
INSERT INTO `country` VALUES(NULL, 'Antigua and Barbuda', 'AG', 'ATG');
INSERT INTO `country` VALUES(NULL, 'Argentina', 'AR', 'ARG');
INSERT INTO `country` VALUES(NULL, 'Armenia', 'AM', 'ARM');
INSERT INTO `country` VALUES(NULL, 'Aruba', 'AW', 'ABW');
INSERT INTO `country` VALUES(NULL, 'Australia', 'AU', 'AUS');
INSERT INTO `country` VALUES(NULL, 'Austria', 'AT', 'AUT');
INSERT INTO `country` VALUES(NULL, 'Azerbaijan', 'AZ', 'AZE');
INSERT INTO `country` VALUES(NULL, 'Bahamas', 'BS', 'BHS');
INSERT INTO `country` VALUES(NULL, 'Bahrain', 'BH', 'BHR');
INSERT INTO `country` VALUES(NULL, 'Bangladesh', 'BD', 'BGD');
INSERT INTO `country` VALUES(NULL, 'Barbados', 'BB', 'BRB');
INSERT INTO `country` VALUES(NULL, 'Belarus', 'BY', 'BLR');
INSERT INTO `country` VALUES(NULL, 'Belgium', 'BE', 'BEL');
INSERT INTO `country` VALUES(NULL, 'Belize', 'BZ', 'BLZ');
INSERT INTO `country` VALUES(NULL, 'Benin', 'BJ', 'BEN');
INSERT INTO `country` VALUES(NULL, 'Bermuda', 'BM', 'BMU');
INSERT INTO `country` VALUES(NULL, 'Bhutan', 'BT', 'BTN');
INSERT INTO `country` VALUES(NULL, 'Bolivia, Plurinational State of', 'BO', 'BOL');
INSERT INTO `country` VALUES(NULL, 'Bonaire, Sint Eustatius and Saba', 'BQ', 'BES');
INSERT INTO `country` VALUES(NULL, 'Bosnia and Herzegovina', 'BA', 'BIH');
INSERT INTO `country` VALUES(NULL, 'Botswana', 'BW', 'BWA');
INSERT INTO `country` VALUES(NULL, 'Bouvet Island', 'BV', 'BVT');
INSERT INTO `country` VALUES(NULL, 'Brazil', 'BR', 'BRA');
INSERT INTO `country` VALUES(NULL, 'British Indian Ocean Territory', 'IO', 'IOT');
INSERT INTO `country` VALUES(NULL, 'Brunei Darussalam', 'BN', 'BRN');
INSERT INTO `country` VALUES(NULL, 'Bulgaria', 'BG', 'BGR');
INSERT INTO `country` VALUES(NULL, 'Burkina Faso', 'BF', 'BFA');
INSERT INTO `country` VALUES(NULL, 'Burundi', 'BI', 'BDI');
INSERT INTO `country` VALUES(NULL, 'Cambodia', 'KH', 'KHM');
INSERT INTO `country` VALUES(NULL, 'Cameroon', 'CM', 'CMR');
INSERT INTO `country` VALUES(NULL, 'Canada', 'CA', 'CAN');
INSERT INTO `country` VALUES(NULL, 'Cabo Verde', 'CV', 'CPV');
INSERT INTO `country` VALUES(NULL, 'Cayman Islands', 'KY', 'CYM');
INSERT INTO `country` VALUES(NULL, 'Central African Republic', 'CF', 'CAF');
INSERT INTO `country` VALUES(NULL, 'Chad', 'TD', 'TCD');
INSERT INTO `country` VALUES(NULL, 'Chile', 'CL', 'CHL');
INSERT INTO `country` VALUES(NULL, 'China', 'CN', 'CHN');
INSERT INTO `country` VALUES(NULL, 'Christmas Island', 'CX', 'CXR');
INSERT INTO `country` VALUES(NULL, 'Cocos (Keeling) Islands', 'CC', 'CCK');
INSERT INTO `country` VALUES(NULL, 'Colombia', 'CO', 'COL');
INSERT INTO `country` VALUES(NULL, 'Comoros', 'KM', 'COM');
INSERT INTO `country` VALUES(NULL, 'Congo', 'CG', 'COG');
INSERT INTO `country` VALUES(NULL, 'Congo, the Democratic Republic of the', 'CD', 'COD');
INSERT INTO `country` VALUES(NULL, 'Cook Islands', 'CK', 'COK');
INSERT INTO `country` VALUES(NULL, 'Costa Rica', 'CR', 'CRI');
INSERT INTO `country` VALUES(NULL, 'Côte d''Ivoire', 'CI', 'CIV');
INSERT INTO `country` VALUES(NULL, 'Croatia', 'HR', 'HRV');
INSERT INTO `country` VALUES(NULL, 'Cuba', 'CU', 'CUB');
INSERT INTO `country` VALUES(NULL, 'Curaçao', 'CW', 'CUW');
INSERT INTO `country` VALUES(NULL, 'Cyprus', 'CY', 'CYP');
INSERT INTO `country` VALUES(NULL, 'Czech Republic', 'CZ', 'CZE');
INSERT INTO `country` VALUES(NULL, 'Denmark', 'DK', 'DNK');
INSERT INTO `country` VALUES(NULL, 'Djibouti', 'DJ', 'DJI');
INSERT INTO `country` VALUES(NULL, 'Dominica', 'DM', 'DMA');
INSERT INTO `country` VALUES(NULL, 'Dominican Republic', 'DO', 'DOM');
INSERT INTO `country` VALUES(NULL, 'Ecuador', 'EC', 'ECU');
INSERT INTO `country` VALUES(NULL, 'Egypt', 'EG', 'EGY');
INSERT INTO `country` VALUES(NULL, 'El Salvador', 'SV', 'SLV');
INSERT INTO `country` VALUES(NULL, 'Equatorial Guinea', 'GQ', 'GNQ');
INSERT INTO `country` VALUES(NULL, 'Eritrea', 'ER', 'ERI');
INSERT INTO `country` VALUES(NULL, 'Estonia', 'EE', 'EST');
INSERT INTO `country` VALUES(NULL, 'Ethiopia', 'ET', 'ETH');
INSERT INTO `country` VALUES(NULL, 'Falkland Islands (Malvinas)', 'FK', 'FLK');
INSERT INTO `country` VALUES(NULL, 'Faroe Islands', 'FO', 'FRO');
INSERT INTO `country` VALUES(NULL, 'Fiji', 'FJ', 'FJI');
INSERT INTO `country` VALUES(NULL, 'Finland', 'FI', 'FIN');
INSERT INTO `country` VALUES(NULL, 'France', 'FR', 'FRA');
INSERT INTO `country` VALUES(NULL, 'French Guiana', 'GF', 'GUF');
INSERT INTO `country` VALUES(NULL, 'French Polynesia', 'PF', 'PYF');
INSERT INTO `country` VALUES(NULL, 'French Southern Territories', 'TF', 'ATF');
INSERT INTO `country` VALUES(NULL, 'Gabon', 'GA', 'GAB');
INSERT INTO `country` VALUES(NULL, 'Gambia', 'GM', 'GMB');
INSERT INTO `country` VALUES(NULL, 'Georgia', 'GE', 'GEO');
INSERT INTO `country` VALUES(NULL, 'Germany', 'DE', 'DEU');
INSERT INTO `country` VALUES(NULL, 'Ghana', 'GH', 'GHA');
INSERT INTO `country` VALUES(NULL, 'Gibraltar', 'GI', 'GIB');
INSERT INTO `country` VALUES(NULL, 'Greece', 'GR', 'GRC');
INSERT INTO `country` VALUES(NULL, 'Greenland', 'GL', 'GRL');
INSERT INTO `country` VALUES(NULL, 'Grenada', 'GD', 'GRD');
INSERT INTO `country` VALUES(NULL, 'Guadeloupe', 'GP', 'GLP');
INSERT INTO `country` VALUES(NULL, 'Guam', 'GU', 'GUM');
INSERT INTO `country` VALUES(NULL, 'Guatemala', 'GT', 'GTM');
INSERT INTO `country` VALUES(NULL, 'Guernsey', 'GG', 'GGY');
INSERT INTO `country` VALUES(NULL, 'Guinea', 'GN', 'GIN');
INSERT INTO `country` VALUES(NULL, 'Guinea-Bissau', 'GW', 'GNB');
INSERT INTO `country` VALUES(NULL, 'Guyana', 'GY', 'GUY');
INSERT INTO `country` VALUES(NULL, 'Haiti', 'HT', 'HTI');
INSERT INTO `country` VALUES(NULL, 'Heard Island and McDonald Islands', 'HM', 'HMD');
INSERT INTO `country` VALUES(NULL, 'Holy See (Vatican City State)', 'VA', 'VAT');
INSERT INTO `country` VALUES(NULL, 'Honduras', 'HN', 'HND');
INSERT INTO `country` VALUES(NULL, 'Hong Kong', 'HK', 'HKG');
INSERT INTO `country` VALUES(NULL, 'Hungary', 'HU', 'HUN');
INSERT INTO `country` VALUES(NULL, 'Iceland', 'IS', 'ISL');
INSERT INTO `country` VALUES(NULL, 'India', 'IN', 'IND');
INSERT INTO `country` VALUES(NULL, 'Indonesia', 'ID', 'IDN');
INSERT INTO `country` VALUES(NULL, 'Iran, Islamic Republic of', 'IR', 'IRN');
INSERT INTO `country` VALUES(NULL, 'Iraq', 'IQ', 'IRQ');
INSERT INTO `country` VALUES(NULL, 'Ireland', 'IE', 'IRL');
INSERT INTO `country` VALUES(NULL, 'Isle of Man', 'IM', 'IMN');
INSERT INTO `country` VALUES(NULL, 'Israel', 'IL', 'ISR');
INSERT INTO `country` VALUES(NULL, 'Italy', 'IT', 'ITA');
INSERT INTO `country` VALUES(NULL, 'Jamaica', 'JM', 'JAM');
INSERT INTO `country` VALUES(NULL, 'Japan', 'JP', 'JPN');
INSERT INTO `country` VALUES(NULL, 'Jersey', 'JE', 'JEY');
INSERT INTO `country` VALUES(NULL, 'Jordan', 'JO', 'JOR');
INSERT INTO `country` VALUES(NULL, 'Kazakhstan', 'KZ', 'KAZ');
INSERT INTO `country` VALUES(NULL, 'Kenya', 'KE', 'KEN');
INSERT INTO `country` VALUES(NULL, 'Kiribati', 'KI', 'KIR');
INSERT INTO `country` VALUES(NULL, 'Korea, Democratic People''s Republic of', 'KP', 'PRK');
INSERT INTO `country` VALUES(NULL, 'Korea, Republic of', 'KR', 'KOR');
INSERT INTO `country` VALUES(NULL, 'Kuwait', 'KW', 'KWT');
INSERT INTO `country` VALUES(NULL, 'Kyrgyzstan', 'KG', 'KGZ');
INSERT INTO `country` VALUES(NULL, 'Lao People''s Democratic Republic', 'LA', 'LAO');
INSERT INTO `country` VALUES(NULL, 'Latvia', 'LV', 'LVA');
INSERT INTO `country` VALUES(NULL, 'Lebanon', 'LB', 'LBN');
INSERT INTO `country` VALUES(NULL, 'Lesotho', 'LS', 'LSO');
INSERT INTO `country` VALUES(NULL, 'Liberia', 'LR', 'LBR');
INSERT INTO `country` VALUES(NULL, 'Libya', 'LY', 'LBY');
INSERT INTO `country` VALUES(NULL, 'Liechtenstein', 'LI', 'LIE');
INSERT INTO `country` VALUES(NULL, 'Lithuania', 'LT', 'LTU');
INSERT INTO `country` VALUES(NULL, 'Luxembourg', 'LU', 'LUX');
INSERT INTO `country` VALUES(NULL, 'Macao', 'MO', 'MAC');
INSERT INTO `country` VALUES(NULL, 'Macedonia, the former Yugoslav Republic of', 'MK', 'MKD');
INSERT INTO `country` VALUES(NULL, 'Madagascar', 'MG', 'MDG');
INSERT INTO `country` VALUES(NULL, 'Malawi', 'MW', 'MWI');
INSERT INTO `country` VALUES(NULL, 'Malaysia', 'MY', 'MYS');
INSERT INTO `country` VALUES(NULL, 'Maldives', 'MV', 'MDV');
INSERT INTO `country` VALUES(NULL, 'Mali', 'ML', 'MLI');
INSERT INTO `country` VALUES(NULL, 'Malta', 'MT', 'MLT');
INSERT INTO `country` VALUES(NULL, 'Marshall Islands', 'MH', 'MHL');
INSERT INTO `country` VALUES(NULL, 'Martinique', 'MQ', 'MTQ');
INSERT INTO `country` VALUES(NULL, 'Mauritania', 'MR', 'MRT');
INSERT INTO `country` VALUES(NULL, 'Mauritius', 'MU', 'MUS');
INSERT INTO `country` VALUES(NULL, 'Mayotte', 'YT', 'MYT');
INSERT INTO `country` VALUES(NULL, 'Mexico', 'MX', 'MEX');
INSERT INTO `country` VALUES(NULL, 'Micronesia, Federated States of', 'FM', 'FSM');
INSERT INTO `country` VALUES(NULL, 'Moldova, Republic of', 'MD', 'MDA');
INSERT INTO `country` VALUES(NULL, 'Monaco', 'MC', 'MCO');
INSERT INTO `country` VALUES(NULL, 'Mongolia', 'MN', 'MNG');
INSERT INTO `country` VALUES(NULL, 'Montenegro', 'ME', 'MNE');
INSERT INTO `country` VALUES(NULL, 'Montserrat', 'MS', 'MSR');
INSERT INTO `country` VALUES(NULL, 'Morocco', 'MA', 'MAR');
INSERT INTO `country` VALUES(NULL, 'Mozambique', 'MZ', 'MOZ');
INSERT INTO `country` VALUES(NULL, 'Myanmar', 'MM', 'MMR');
INSERT INTO `country` VALUES(NULL, 'Namibia', 'NA', 'NAM');
INSERT INTO `country` VALUES(NULL, 'Nauru', 'NR', 'NRU');
INSERT INTO `country` VALUES(NULL, 'Nepal', 'NP', 'NPL');
INSERT INTO `country` VALUES(NULL, 'Netherlands', 'NL', 'NLD');
INSERT INTO `country` VALUES(NULL, 'New Caledonia', 'NC', 'NCL');
INSERT INTO `country` VALUES(NULL, 'New Zealand', 'NZ', 'NZL');
INSERT INTO `country` VALUES(NULL, 'Nicaragua', 'NI', 'NIC');
INSERT INTO `country` VALUES(NULL, 'Niger', 'NE', 'NER');
INSERT INTO `country` VALUES(NULL, 'Nigeria', 'NG', 'NGA');
INSERT INTO `country` VALUES(NULL, 'Niue', 'NU', 'NIU');
INSERT INTO `country` VALUES(NULL, 'Norfolk Island', 'NF', 'NFK');
INSERT INTO `country` VALUES(NULL, 'Northern Mariana Islands', 'MP', 'MNP');
INSERT INTO `country` VALUES(NULL, 'Norway', 'NO', 'NOR');
INSERT INTO `country` VALUES(NULL, 'Oman', 'OM', 'OMN');
INSERT INTO `country` VALUES(NULL, 'Pakistan', 'PK', 'PAK');
INSERT INTO `country` VALUES(NULL, 'Palau', 'PW', 'PLW');
INSERT INTO `country` VALUES(NULL, 'Palestine, State of', 'PS', 'PSE');
INSERT INTO `country` VALUES(NULL, 'Panama', 'PA', 'PAN');
INSERT INTO `country` VALUES(NULL, 'Papua New Guinea', 'PG', 'PNG');
INSERT INTO `country` VALUES(NULL, 'Paraguay', 'PY', 'PRY');
INSERT INTO `country` VALUES(NULL, 'Peru', 'PE', 'PER');
INSERT INTO `country` VALUES(NULL, 'Philippines', 'PH', 'PHL');
INSERT INTO `country` VALUES(NULL, 'Pitcairn', 'PN', 'PCN');
INSERT INTO `country` VALUES(NULL, 'Poland', 'PL', 'POL');
INSERT INTO `country` VALUES(NULL, 'Portugal', 'PT', 'PRT');
INSERT INTO `country` VALUES(NULL, 'Puerto Rico', 'PR', 'PRI');
INSERT INTO `country` VALUES(NULL, 'Qatar', 'QA', 'QAT');
INSERT INTO `country` VALUES(NULL, 'Réunion', 'RE', 'REU');
INSERT INTO `country` VALUES(NULL, 'Romania', 'RO', 'ROU');
INSERT INTO `country` VALUES(NULL, 'Russian Federation', 'RU', 'RUS');
INSERT INTO `country` VALUES(NULL, 'Rwanda', 'RW', 'RWA');
INSERT INTO `country` VALUES(NULL, 'Saint Barthélemy', 'BL', 'BLM');
INSERT INTO `country` VALUES(NULL, 'Saint Helena, Ascension and Tristan da Cunha', 'SH', 'SHN');
INSERT INTO `country` VALUES(NULL, 'Saint Kitts and Nevis', 'KN', 'KNA');
INSERT INTO `country` VALUES(NULL, 'Saint Lucia', 'LC', 'LCA');
INSERT INTO `country` VALUES(NULL, 'Saint Martin (French part)', 'MF', 'MAF');
INSERT INTO `country` VALUES(NULL, 'Saint Pierre and Miquelon', 'PM', 'SPM');
INSERT INTO `country` VALUES(NULL, 'Saint Vincent and the Grenadines', 'VC', 'VCT');
INSERT INTO `country` VALUES(NULL, 'Samoa', 'WS', 'WSM');
INSERT INTO `country` VALUES(NULL, 'San Marino', 'SM', 'SMR');
INSERT INTO `country` VALUES(NULL, 'Sao Tome and Principe', 'ST', 'STP');
INSERT INTO `country` VALUES(NULL, 'Saudi Arabia', 'SA', 'SAU');
INSERT INTO `country` VALUES(NULL, 'Senegal', 'SN', 'SEN');
INSERT INTO `country` VALUES(NULL, 'Serbia', 'RS', 'SRB');
INSERT INTO `country` VALUES(NULL, 'Seychelles', 'SC', 'SYC');
INSERT INTO `country` VALUES(NULL, 'Sierra Leone', 'SL', 'SLE');
INSERT INTO `country` VALUES(NULL, 'Singapore', 'SG', 'SGP');
INSERT INTO `country` VALUES(NULL, 'Sint Maarten (Dutch part)', 'SX', 'SXM');
INSERT INTO `country` VALUES(NULL, 'Slovakia', 'SK', 'SVK');
INSERT INTO `country` VALUES(NULL, 'Slovenia', 'SI', 'SVN');
INSERT INTO `country` VALUES(NULL, 'Solomon Islands', 'SB', 'SLB');
INSERT INTO `country` VALUES(NULL, 'Somalia', 'SO', 'SOM');
INSERT INTO `country` VALUES(NULL, 'South Africa', 'ZA', 'ZAF');
INSERT INTO `country` VALUES(NULL, 'South Georgia and the South Sandwich Islands', 'GS', 'SGS');
INSERT INTO `country` VALUES(NULL, 'South Sudan', 'SS', 'SSD');
INSERT INTO `country` VALUES(NULL, 'Spain', 'ES', 'ESP');
INSERT INTO `country` VALUES(NULL, 'Sri Lanka', 'LK', 'LKA');
INSERT INTO `country` VALUES(NULL, 'Sudan', 'SD', 'SDN');
INSERT INTO `country` VALUES(NULL, 'Suriname', 'SR', 'SUR');
INSERT INTO `country` VALUES(NULL, 'Svalbard and Jan Mayen', 'SJ', 'SJM');
INSERT INTO `country` VALUES(NULL, 'Swaziland', 'SZ', 'SWZ');
INSERT INTO `country` VALUES(NULL, 'Sweden', 'SE', 'SWE');
INSERT INTO `country` VALUES(NULL, 'Switzerland', 'CH', 'CHE');
INSERT INTO `country` VALUES(NULL, 'Syrian Arab Republic', 'SY', 'SYR');
INSERT INTO `country` VALUES(NULL, 'Taiwan, Province of China', 'TW', 'TWN');
INSERT INTO `country` VALUES(NULL, 'Tajikistan', 'TJ', 'TJK');
INSERT INTO `country` VALUES(NULL, 'Tanzania, United Republic of', 'TZ', 'TZA');
INSERT INTO `country` VALUES(NULL, 'Thailand', 'TH', 'THA');
INSERT INTO `country` VALUES(NULL, 'Timor-Leste', 'TL', 'TLS');
INSERT INTO `country` VALUES(NULL, 'Togo', 'TG', 'TGO');
INSERT INTO `country` VALUES(NULL, 'Tokelau', 'TK', 'TKL');
INSERT INTO `country` VALUES(NULL, 'Tonga', 'TO', 'TON');
INSERT INTO `country` VALUES(NULL, 'Trinidad and Tobago', 'TT', 'TTO');
INSERT INTO `country` VALUES(NULL, 'Tunisia', 'TN', 'TUN');
INSERT INTO `country` VALUES(NULL, 'Turkey', 'TR', 'TUR');
INSERT INTO `country` VALUES(NULL, 'Turkmenistan', 'TM', 'TKM');
INSERT INTO `country` VALUES(NULL, 'Turks and Caicos Islands', 'TC', 'TCA');
INSERT INTO `country` VALUES(NULL, 'Tuvalu', 'TV', 'TUV');
INSERT INTO `country` VALUES(NULL, 'Uganda', 'UG', 'UGA');
INSERT INTO `country` VALUES(NULL, 'Ukraine', 'UA', 'UKR');
INSERT INTO `country` VALUES(NULL, 'United Arab Emirates', 'AE', 'ARE');
INSERT INTO `country` VALUES(NULL, 'United Kingdom', 'GB', 'GBR');
INSERT INTO `country` VALUES(NULL, 'United States', 'US', 'USA');
INSERT INTO `country` VALUES(NULL, 'United States Minor Outlying Islands', 'UM', 'UMI');
INSERT INTO `country` VALUES(NULL, 'Uruguay', 'UY', 'URY');
INSERT INTO `country` VALUES(NULL, 'Uzbekistan', 'UZ', 'UZB');
INSERT INTO `country` VALUES(NULL, 'Vanuatu', 'VU', 'VUT');
INSERT INTO `country` VALUES(NULL, 'Venezuela, Bolivarian Republic of', 'VE', 'VEN');
INSERT INTO `country` VALUES(NULL, 'Viet Nam', 'VN', 'VNM');
INSERT INTO `country` VALUES(NULL, 'Virgin Islands, British', 'VG', 'VGB');
INSERT INTO `country` VALUES(NULL, 'Virgin Islands, U.S.', 'VI', 'VIR');
INSERT INTO `country` VALUES(NULL, 'Wallis and Futuna', 'WF', 'WLF');
INSERT INTO `country` VALUES(NULL, 'Western Sahara', 'EH', 'ESH');
INSERT INTO `country` VALUES(NULL, 'Yemen', 'YE', 'YEM');
INSERT INTO `country` VALUES(NULL, 'Zambia', 'ZM', 'ZMB');
INSERT INTO `country` VALUES(NULL, 'Zimbabwe', 'ZW', 'ZWE');
