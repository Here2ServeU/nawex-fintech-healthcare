import React from "react";

export default function EventTable({ rows = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td>{row.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
