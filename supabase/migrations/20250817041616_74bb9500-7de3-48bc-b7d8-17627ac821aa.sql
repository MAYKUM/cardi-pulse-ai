-- Add orthopedics as a valid specialty
ALTER TYPE specialty_enum ADD VALUE IF NOT EXISTS 'orthopedics';