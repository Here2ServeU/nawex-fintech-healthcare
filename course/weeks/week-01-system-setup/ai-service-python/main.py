from contextlib import asynccontextmanager
from typing import Dict, List
import time

from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel, Field

API_KEY = "nerp-local-key"


class TransactionFeatures(BaseModel):
    amount: float = Field(..., gt=0)
    hour_of_day: int = Field(..., ge=0, le=23)
    day_of_week: int = Field(..., ge=0, le=6)
    user_account_age_days: int = Field(..., ge=0)
    merchant_category: str
    is_online: bool


class FraudPrediction(BaseModel):
    fraud_probability: float
    risk_level: str
    requires_review: bool
    explanation: Dict[str, float]


class CreditApplication(BaseModel):
    annual_income: float = Field(..., gt=0)
    employment_length_years: int = Field(..., ge=0)
    loan_amount: float = Field(..., gt=0)
    loan_to_income_ratio: float = Field(..., ge=0)
    debt_to_income_ratio: float = Field(..., ge=0)
    num_credit_accounts: int = Field(..., ge=0)
    num_late_payments_2yr: int = Field(..., ge=0)
    credit_utilization: float = Field(..., ge=0)
    account_age_months: int = Field(..., ge=0)
    num_recent_inquiries_6mo: int = Field(..., ge=0)


class CreditDecision(BaseModel):
    decision: str
    score: float
    adverse_action_reasons: List[str]
    regulatory_notice: str


class PatientFeatures(BaseModel):
    age: int = Field(..., ge=0, le=130)
    length_of_stay_days: int = Field(..., ge=0)
    num_diagnoses: int = Field(..., ge=1)
    num_medications: int = Field(..., ge=0)
    prior_admissions_12mo: int = Field(..., ge=0)
    discharge_disposition: str
    primary_diagnosis_category: str
    has_diabetes: bool
    has_heart_failure: bool
    has_copd: bool


class ReadmissionPrediction(BaseModel):
    readmission_probability: float
    risk_tier: str
    recommended_actions: List[str]


class DischargeNote(BaseModel):
    text: str = Field(..., min_length=10, max_length=10000)
    patient_id: str
    encounter_id: str


class NLPAnalysis(BaseModel):
    entities: Dict[str, List[str]]
    readmission_risk_from_text: float
    text_risk_tier: str
    flagged_for_review: bool
    processing_time_ms: float


class IncidentMetrics(BaseModel):
    service: str
    cpu_percent: float = Field(..., ge=0, le=100)
    memory_percent: float = Field(..., ge=0, le=100)
    error_rate: float = Field(..., ge=0, le=1)
    latency_ms: float = Field(..., ge=0)
    logs_per_minute: int = Field(..., ge=0)


class IncidentPrediction(BaseModel):
    failure_probability: float
    failure_risk: str
    top_signals: Dict[str, float]
    recommendation: str


class LogBatch(BaseModel):
    service: str
    entries: List[str] = Field(..., min_length=1)


class LogAnomalyResponse(BaseModel):
    anomaly_score: float
    anomaly_detected: bool
    matched_patterns: List[str]
    summary: str


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.models = {"fraud": "demo", "credit": "demo", "readmission": "demo", "nlp": "demo"}
    yield
    app.state.models.clear()


app = FastAPI(title="NERP AI Service", version="1.0.0", lifespan=lifespan)


def authorize(x_api_key: str | None):
    if x_api_key not in (None, API_KEY):
        raise HTTPException(status_code=403, detail="Invalid API key")


def clamp(value: float) -> float:
    return max(0.0, min(1.0, value))


@app.get("/health")
async def health():
    return {"status": "ok", "service": "nerp-ai-service"}


@app.get("/metrics", response_class=PlainTextResponse)
async def metrics():
    return (
        "# HELP nerp_ai_service_up AI service availability\n"
        "# TYPE nerp_ai_service_up gauge\n"
        "nerp_ai_service_up 1\n"
    )


@app.post("/predict/fraud", response_model=FraudPrediction)
async def predict_fraud(payload: TransactionFeatures, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    score = clamp(
        0.18
        + min(payload.amount / 5000.0, 0.35)
        + (0.12 if payload.hour_of_day >= 22 or payload.hour_of_day <= 4 else 0.0)
        + (0.08 if payload.is_online else 0.0)
        + (0.1 if payload.user_account_age_days < 30 else 0.0)
    )
    risk_level = "low" if score < 0.3 else "medium" if score < 0.6 else "high" if score < 0.85 else "critical"
    return FraudPrediction(
        fraud_probability=round(score, 4),
        risk_level=risk_level,
        requires_review=score > 0.55,
        explanation={
            "amount": round(min(payload.amount / 5000.0, 0.35), 4),
            "night_activity": 0.12 if payload.hour_of_day >= 22 or payload.hour_of_day <= 4 else 0.0,
            "new_account": 0.1 if payload.user_account_age_days < 30 else 0.0,
        },
    )


@app.post("/predict/credit", response_model=CreditDecision)
async def predict_credit(payload: CreditApplication, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    default_risk = clamp(
        0.15
        + min(payload.loan_to_income_ratio * 0.35, 0.35)
        + min(payload.debt_to_income_ratio * 0.4, 0.25)
        + min(payload.credit_utilization * 0.25, 0.2)
        + min(payload.num_late_payments_2yr * 0.08, 0.2)
        + min(payload.num_recent_inquiries_6mo * 0.04, 0.12)
        - min(payload.account_age_months / 240.0, 0.12)
    )
    approved = default_risk < 0.45
    reasons = []
    if payload.debt_to_income_ratio > 0.4:
        reasons.append("Debt-to-income ratio too high")
    if payload.credit_utilization > 0.55:
        reasons.append("Credit utilization too high")
    if payload.num_late_payments_2yr > 1:
        reasons.append("Recent delinquencies on record")
    if payload.num_recent_inquiries_6mo > 3:
        reasons.append("Too many recent credit inquiries")

    return CreditDecision(
        decision="approved" if approved else "denied",
        score=round(default_risk, 4),
        adverse_action_reasons=[] if approved else reasons[:3],
        regulatory_notice="This action was taken based on information in your credit application.",
    )


@app.post("/predict/readmission", response_model=ReadmissionPrediction)
async def predict_readmission(payload: PatientFeatures, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    risk = clamp(
        0.12
        + min(payload.length_of_stay_days / 20.0, 0.22)
        + min(payload.prior_admissions_12mo * 0.12, 0.24)
        + min(payload.num_diagnoses * 0.04, 0.16)
        + min(payload.num_medications * 0.02, 0.12)
        + (0.08 if payload.has_heart_failure else 0.0)
        + (0.06 if payload.has_diabetes else 0.0)
        + (0.05 if payload.has_copd else 0.0)
    )
    tier_num = 1 if risk < 0.25 else 2 if risk < 0.5 else 3 if risk < 0.75 else 4
    actions: List[str] = []
    if risk > 0.5:
        actions.append("Schedule follow-up within 7 days of discharge")
    if risk > 0.65:
        actions.append("Assign care coordinator for post-discharge monitoring")
    if risk > 0.8:
        actions.append("Consider extended inpatient observation")

    return ReadmissionPrediction(
        readmission_probability=round(risk, 4),
        risk_tier=f"Tier {tier_num}",
        recommended_actions=actions,
    )


@app.post("/analyze/discharge-note", response_model=NLPAnalysis)
async def analyze_discharge_note(payload: DischargeNote, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    start = time.time()
    lowered = payload.text.lower()
    meds = [name for name in ["metformin", "lisinopril", "aspirin", "furosemide", "atorvastatin", "warfarin", "insulin"] if name in lowered]
    diagnoses = [name for name in ["t2dm", "hf", "copd", "ckd", "cad", "afib", "chf", "mi"] if name in lowered]
    dosages = []
    for token in payload.text.replace("/", " ").split():
      cleaned = token.strip(",.")
      if cleaned.endswith(("mg", "mcg", "ml", "units", "g")):
          dosages.append(cleaned)
    negated = [term for term in ["chest pain", "sob", "fever"] if f"no {term}" in lowered or f"denies {term}" in lowered]

    risk = clamp(0.25 + (0.2 if "follow-up" in lowered or "follow up" in lowered else 0.0) + min(len(diagnoses) * 0.1, 0.25))
    tier = 1 if risk < 0.25 else 2 if risk < 0.5 else 3 if risk < 0.75 else 4

    return NLPAnalysis(
        entities={
            "medications": meds,
            "diagnoses": diagnoses,
            "dosages": dosages,
            "negated": negated,
        },
        readmission_risk_from_text=round(risk, 4),
        text_risk_tier=f"Tier {tier}",
        flagged_for_review=tier >= 3,
        processing_time_ms=round((time.time() - start) * 1000, 2),
    )


@app.post("/predict/incident", response_model=IncidentPrediction)
async def predict_incident(payload: IncidentMetrics, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    risk = clamp(
        0.08
        + min(payload.cpu_percent / 100.0 * 0.3, 0.3)
        + min(payload.memory_percent / 100.0 * 0.24, 0.24)
        + min(payload.error_rate * 2.2, 0.22)
        + min(payload.latency_ms / 1000.0 * 0.18, 0.18)
        + min(payload.logs_per_minute / 5000.0 * 0.12, 0.12)
    )
    failure_risk = "low" if risk < 0.3 else "warning" if risk < 0.6 else "high" if risk < 0.85 else "critical"
    recommendation = (
        "Scale deployment and inspect recent errors"
        if risk >= 0.6
        else "Monitor traffic and verify saturation trends"
        if risk >= 0.3
        else "No immediate action required"
    )
    return IncidentPrediction(
        failure_probability=round(risk, 4),
        failure_risk=failure_risk,
        top_signals={
            "cpu_percent": round(payload.cpu_percent / 100.0, 4),
            "memory_percent": round(payload.memory_percent / 100.0, 4),
            "error_rate": round(payload.error_rate, 4),
            "latency_ms": round(min(payload.latency_ms / 1000.0, 1.0), 4),
        },
        recommendation=recommendation,
    )


@app.post("/analyze/logs", response_model=LogAnomalyResponse)
async def analyze_logs(payload: LogBatch, x_api_key: str | None = Header(default=None)):
    authorize(x_api_key)

    patterns = ["exception", "timeout", "connection refused", "oom", "panic", "traceback"]
    lowered_entries = [entry.lower() for entry in payload.entries]
    matched = sorted({pattern for pattern in patterns for entry in lowered_entries if pattern in entry})
    anomaly_score = clamp(len(matched) * 0.22 + (0.18 if any("5xx" in entry or "error" in entry for entry in lowered_entries) else 0.0))
    return LogAnomalyResponse(
        anomaly_score=round(anomaly_score, 4),
        anomaly_detected=anomaly_score >= 0.35,
        matched_patterns=matched,
        summary=f"{payload.service} log batch analyzed with {len(matched)} anomaly indicators detected.",
    )
