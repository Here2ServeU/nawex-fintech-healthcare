import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function FintechDashboard() {
  return (
    <DomainDashboard
      title="FinTech Intelligence"
      description="Track transaction flow, inspect operational records, and query OpenSearch for merchant, user, amount, and location signals."
      accent="#0f766e"
      recordPath="/api/fintech/records"
      searchPath="/api/fintech/search"
      searchPlaceholder="Search fintech events, merchants, users, or locations"
      summaryBuilder={(records) => {
        const totalAmount = records.reduce((sum, record) => sum + Number(record.amount || 0), 0);
        const highValueCount = records.filter((record) => Number(record.amount || 0) >= 1000).length;
        const uniqueUsers = new Set(records.map((record) => record.user_id).filter(Boolean)).size;

        return [
          {
            title: "Transactions",
            value: records.length,
            subtitle: "Records available in the access layer"
          },
          {
            title: "Total Amount",
            value: `$${totalAmount.toFixed(2)}`,
            subtitle: "Sum of loaded transaction values"
          },
          {
            title: "High Value",
            value: highValueCount,
            subtitle: "Transactions at or above $1,000"
          },
          {
            title: "Active Users",
            value: uniqueUsers,
            subtitle: "Distinct users in current records"
          }
        ];
      }}
    />
  );
}
