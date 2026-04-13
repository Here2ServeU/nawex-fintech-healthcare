import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function FintechDashboard() {
  return (
    <DomainDashboard
      title="NerpPay"
      subtitle="AI-powered FinTech platform"
      description="Use the same platform to simulate transaction streams, score suspicious activity, and show how domain AI extends the reliability core into FinTech."
      accent="#0f766e"
      recordPath="/api/transactions"
      scorePath="/api/predictions/fraud"
      scoreLabel="Fraud score"
      samplePayload={{
        amount: 1850.42,
        hour_of_day: 23,
        day_of_week: 5,
        user_account_age_days: 12,
        merchant_category: "electronics",
        is_online: true
      }}
      summaryBuilder={(records) => {
        const totalAmount = records.reduce((sum, record) => sum + Number(record.amount || 0), 0);
        const reviewCount = records.filter((record) => record.fraud_flagged).length;
        const averageFraud = records.length
          ? records.reduce((sum, record) => sum + Number(record.fraud_score || 0), 0) / records.length
          : 0;

        return [
          { title: "Transactions", value: records.length, subtitle: "Latest PostgreSQL transaction rows" },
          { title: "Value", value: `$${totalAmount.toFixed(2)}`, subtitle: "Current loaded transaction amount" },
          { title: "Under Review", value: reviewCount, subtitle: "Fraud-flagged records" },
          { title: "Avg Fraud", value: averageFraud.toFixed(3), subtitle: "Mean model score" }
        ];
      }}
    />
  );
}
