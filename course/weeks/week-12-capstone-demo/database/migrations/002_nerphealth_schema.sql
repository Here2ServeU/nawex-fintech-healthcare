CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn VARCHAR(50) UNIQUE NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clinical_encounters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  encounter_type VARCHAR(50) NOT NULL,
  admission_date TIMESTAMPTZ NOT NULL,
  discharge_date TIMESTAMPTZ,
  primary_diagnosis VARCHAR(20),
  readmission_risk NUMERIC(5,4),
  discharge_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS phi_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accessed_by UUID NOT NULL REFERENCES users(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action VARCHAR(50) NOT NULL,
  reason VARCHAR(255) NOT NULL
);
