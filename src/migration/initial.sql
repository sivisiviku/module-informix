CREATE TABLE mnt_currency
(
    code VARCHAR(40) NOT NULL PRIMARY KEY,
    date_created DATETIME NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    last_updated DATETIME NOT NULL,
    updated_by VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    delete_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE mnt_country
(
    code VARCHAR(40) NOT NULL PRIMARY KEY,
    date_created DATETIME NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    last_updated DATETIME NOT NULL,
    updated_by VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    delete_flag BOOLEAN NOT NULL DEFAULT FALSE,
    currency_code VARCHAR(40) NOT NULL
);

---

INSERT INTO
	`mnt_currency` (`code`, `date_created`, `created_by`, `last_updated`, `updated_by`, `name`, `delete_flag`)
	VALUES
        ('IDR', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Indonesian Rupiah', b'0'),
    	('JPY', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Japanese Yen', b'0'),
        ('INR', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Indian Rupee', b'0'),
        ('USD', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'US Dollar', b'0'),
        ('HKD', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Hong Kong Dollar', b'0'),
        ('CHY', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Chinese Yuan', b'0'),
        ('EUR', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Euro', b'0'),
        ('SEK', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Swedish Krona', b'0'),
        ('DKK', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Danish Krone', b'0'),
        ('NOK', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Norwegian Krone', b'0');

INSERT INTO
	`mnt_country` (`code`, `date_created`, `created_by`, `last_updated`, `updated_by`, `name`, `delete_flag`, `currency_code`)
	VALUES
        ('IDN', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Indonesia', b'0', 'IDR'),
    	('JPN', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Japan', b'0', 'JPY'),
        ('IND', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'India', b'0', 'INR'),
        ('USA', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'United States of America', b'0', 'USA'),
        ('HKG', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Hong Kong', b'0', 'HKG'),
        ('CHN', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'China, PRC', b'0', 'CHN'),
        ('DEU', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Germany', b'0', 'EUR'),
        ('SWE', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Sweden', b'0', 'SEK'),
        ('DNK', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Denmark', b'0', 'DKK'),
        ('NOR', CURRENT_TIME(), 'Admin', CURRENT_TIME(), 'Admin', 'Norway', b'0', 'NOK');
