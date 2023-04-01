import { ServiceStatus } from "./ServiceStatus";

export default function ServiceRow({ service }: any) {
  const { isOnline, name, responseTime }: ServiceStatus = service;
  return (
    <tr>
      <td>{name}</td>
      <td>{isOnline ? "Yes" : "No"}</td>
      <td>{isOnline ? responseTime : "N/A"}</td>
    </tr>
  );
}
