const db = require("../db");
const { predictReadmission, analyzeDischargeNote } = require("../services/aiService");

async function getAll(req, res) {
  const result = await db.query(
    `SELECT p.id, p.mrn, p.date_of_birth, p.gender, p.created_at,
            e.id AS encounter_id, e.encounter_type, e.admission_date, e.discharge_date,
            e.primary_diagnosis, e.readmission_risk, e.discharge_notes
       FROM patients p
  LEFT JOIN LATERAL (
         SELECT id, encounter_type, admission_date, discharge_date, primary_diagnosis, readmission_risk, discharge_notes
           FROM clinical_encounters
          WHERE patient_id = p.id
          ORDER BY created_at DESC
          LIMIT 1
       ) e ON true
      ORDER BY p.created_at DESC
      LIMIT 100`
  );

  res.json(result.rows);
}

async function getById(req, res) {
  const patient = await db.query(
    "SELECT id, mrn, date_of_birth, gender, created_at FROM patients WHERE id = $1",
    [req.params.id]
  );

  if (patient.rowCount === 0) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const encounters = await db.query(
    `SELECT id, encounter_type, admission_date, discharge_date, primary_diagnosis,
            readmission_risk, discharge_notes, created_at
       FROM clinical_encounters
      WHERE patient_id = $1
      ORDER BY created_at DESC`,
    [req.params.id]
  );

  return res.json({
    ...patient.rows[0],
    encounters: encounters.rows
  });
}

async function scoreReadmission(req, res) {
  try {
    const result = await predictReadmission(req.body);
    res.json(result);
  } catch (error) {
    res.status(502).json({ error: "Readmission service unavailable" });
  }
}

async function runDischargeNlp(req, res) {
  try {
    const result = await analyzeDischargeNote(req.body);
    res.json(result);
  } catch (error) {
    res.status(502).json({ error: "Clinical NLP service unavailable" });
  }
}

module.exports = {
  getAll,
  getById,
  scoreReadmission,
  runDischargeNlp
};
