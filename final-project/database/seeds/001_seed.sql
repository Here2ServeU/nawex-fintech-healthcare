INSERT INTO users (email, full_name, role)
VALUES
  ('analyst@nerppay.local', 'NerpPay Analyst', 'analyst'),
  ('clinician@nerphealth.local', 'NerpHealth Clinician', 'nurse'),
  ('admin@nerp.local', 'NERP Platform Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO patients (mrn, date_of_birth, gender)
VALUES
  ('MRN-1001', '1958-03-14', 'female'),
  ('MRN-1002', '1974-08-28', 'male'),
  ('MRN-1003', '1990-01-17', 'female')
ON CONFLICT (mrn) DO NOTHING;

INSERT INTO transactions (user_id, amount, currency, transaction_type, status, merchant_name, fraud_score, fraud_flagged)
SELECT id, 125.40, 'USD', 'payment', 'approved', 'Corner Pharmacy', 0.1821, FALSE FROM users WHERE email = 'analyst@nerppay.local'
UNION ALL
SELECT id, 1840.00, 'USD', 'transfer', 'under_review', 'Northwind Devices', 0.8122, TRUE FROM users WHERE email = 'admin@nerp.local'
UNION ALL
SELECT id, 64.75, 'USD', 'payment', 'approved', 'Transit Hub', 0.0941, FALSE FROM users WHERE email = 'analyst@nerppay.local';

INSERT INTO clinical_encounters (patient_id, encounter_type, admission_date, discharge_date, primary_diagnosis, readmission_risk, discharge_notes)
SELECT id, 'inpatient', NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day', 'I50', 0.7420,
  'Patient with HF and T2DM. Continue metformin 500mg BID and cardiology follow-up within 7 days.'
FROM patients WHERE mrn = 'MRN-1001'
UNION ALL
SELECT id, 'emergency', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days', 'J44', 0.3820,
  'COPD exacerbation improved. No chest pain. Denies SOB at discharge.'
FROM patients WHERE mrn = 'MRN-1002'
UNION ALL
SELECT id, 'telehealth', NOW() - INTERVAL '1 day', NOW(), 'E11', 0.2110,
  'Medication review complete. Stable for home monitoring.'
FROM patients WHERE mrn = 'MRN-1003';
