import type { Package, PackageStatus } from "../types/types";

// Helper to quickly clone a package and change ID/status
const createMockPackage = (id: number, status: PackageStatus): Package => ({
  id,
  sender: {
    id: 10 + id,
    email: `sender${id}@example.com`,
    name: `Alice Sender ${id}`,
    role: "sender",
    companyName: "Sender AB",
    createdAt: "2025-10-10T08:00:00Z",
    updatedAt: "2025-10-10T08:00:00Z",
  },
  receiver: {
    id: 20 + id,
    email: `receiver${id}@example.com`,
    name: `Bob Receiver ${id}`,
    role: "receiver",
    companyName: "Receiver AB",
    createdAt: "2025-10-10T08:00:00Z",
    updatedAt: "2025-10-10T08:00:00Z",
  },
  currentCarrier: {
    id: 30 + id,
    email: `carrier${id}@example.com`,
    name: `Carl Carrier ${id}`,
    role: "carrier",
    companyName: "Transport AB",
    createdAt: "2025-10-10T08:00:00Z",
    updatedAt: "2025-10-10T08:00:00Z",
  },
  senderAddress: {
    id: 1,
    street: "Main Street 1",
    city: "Stockholm",
    postalCode: "11122",
    country: "Sweden",
  },
  receiverAddress: {
    id: 2,
    street: "Second Street 5",
    city: "Gothenburg",
    postalCode: "41234",
    country: "Sweden",
  },
  deviceId: `device-00${id}`,
  status,
  trackingCode: `ABC123-${id}`,
  createdAt: "2025-10-10T08:00:00Z",
  updatedAt: "2025-10-10T08:00:00Z",
  eta: "2025-10-20T18:00:00Z",
  readings: [
    {
      id: id * 100,
      deviceId: `device-00${id}`,
      lat: 59.3293,
      lng: 18.0686,
      temperature: 7 + id,
      humidity: 55 + id,
      createdAt: "2025-10-10T09:00:00Z",
    },
  ],
});

// Export an array of mock packages with different statuses
export const MOCK_PACKAGES: Package[] = [
  createMockPackage(1, "in_transit"),
  createMockPackage(2, "pending"),
  createMockPackage(3, "delivered"),
];
