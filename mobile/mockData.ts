const packages = [
  {
    sender_id: 1,
    receiver_id: 4,
    sender_address_id: 1,
    receiver_address_id: 4,
    current_carrier_id: 2,
    device_id: 1,
    status: "in_transit",
    tracking_code: "TRK1234-5678-9012-3456",
    eta: "2024-09-10 14:30:00",
  },
  {
    sender_id: 2,
    receiver_id: 7,
    sender_address_id: 2,
    receiver_address_id: 7,
    current_carrier_id: 3,
    device_id: 2,
    status: "received",
    tracking_code: "TRK9876-5432-1098-7654",
    eta: "2024-09-05 10:15:00",
  },
];
const package_tracking = [
  {
    device_id: 1,
    lat: 59.334591,
    lng: 18.06324,
    temperature: 2.5,
    humidity: 0.452,
    created_at: "2024-09-07 08:00:00",
  },
];
const auth = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    password_hash: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    role: "customer",
    company_name: "Acme AB",
  },
  {
    email: "jane.doe@example.com",
    name: "Jane Doe",
    password_hash: "$2b$10$abcdefghijklmvdafjgalebrpqrstuvwxyz",
    role: "carrier",
    company_name: "Transport Co",
  },
  {
    email: "jessica.eriksson@admin.com",
    name: "Jessica Erksson",
    password_hash: "$2b$55$abcdefghijklmvdafjgalebrpqrstuvwxyz",
    role: "admin",
    company_name: "Logi Systems",
  },
];

export { packages, package_tracking, auth };
