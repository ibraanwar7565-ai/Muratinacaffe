-- ============================================================
--  Migration: expanded Settings + manager passcode
--  Run only if you imported schema.sql before these features.
-- ============================================================
USE muratina_pos;

ALTER TABLE settings
  ADD COLUMN service_charge DECIMAL(5,2) DEFAULT 0.00            AFTER tax_rate,
  ADD COLUMN loyalty_rate  INT          DEFAULT 100              AFTER service_charge,
  ADD COLUMN low_stock_default INT      DEFAULT 5                AFTER loyalty_rate,
  ADD COLUMN kra_pin       VARCHAR(40)  DEFAULT NULL             AFTER email,
  ADD COLUMN default_theme ENUM('light','dark') DEFAULT 'light' AFTER kra_pin,
  ADD COLUMN session_timeout INT        DEFAULT 30              AFTER default_theme,
  ADD COLUMN receipt_name  VARCHAR(150) DEFAULT NULL             AFTER session_timeout,
  ADD COLUMN receipt_header_note VARCHAR(255) DEFAULT NULL       AFTER receipt_name,
  ADD COLUMN receipt_width ENUM('80','58') DEFAULT '80'          AFTER receipt_footer,
  ADD COLUMN receipt_show_logo     TINYINT(1) DEFAULT 1          AFTER receipt_width,
  ADD COLUMN receipt_show_tax      TINYINT(1) DEFAULT 1          AFTER receipt_show_logo,
  ADD COLUMN receipt_show_served   TINYINT(1) DEFAULT 1          AFTER receipt_show_tax,
  ADD COLUMN receipt_show_customer TINYINT(1) DEFAULT 1          AFTER receipt_show_served;

-- Service charge column on sales
ALTER TABLE sales ADD COLUMN service_charge DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER tax;

-- Set the manager (admin) login passcode to 194825
UPDATE users SET passcode = '$2y$12$QyHa75WDHWQyKkBgPKlmbeRjY04K.JSgxALgya6xMhiqtv4tBwwJ2'
WHERE username = 'admin';
