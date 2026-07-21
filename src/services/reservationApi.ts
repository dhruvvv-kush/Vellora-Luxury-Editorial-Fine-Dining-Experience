export type SeatingArea = "Main Dining Room" | "Chef's Counter" | "Garden Terrace" | "Private Dining Room";

export type ReservationStatus = "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: SeatingArea;
  notes?: string;
  createdAt: string;
  status: ReservationStatus;
}

export interface TimeSlot {
  time: string;
  availableTables: number;
  status: "available" | "limited" | "booked";
}

const STORAGE_KEY = "vellora_reservations_v1";

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "VEL-8921",
    name: "Elena Rostova",
    email: "elena@example.com",
    phone: "+1 (555) 234-5678",
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: "7:00 PM",
    seatingArea: "Chef's Counter",
    notes: "Anniversary celebration.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    status: "confirmed",
  },
  {
    id: "VEL-4412",
    name: "Marcus Vance",
    email: "marcus@example.com",
    phone: "+1 (555) 876-5432",
    guests: 4,
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
    time: "8:30 PM",
    seatingArea: "Garden Terrace",
    notes: "Dietary restriction: Gluten-free.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    status: "confirmed",
  },
];

const DEFAULT_TIME_SLOTS: { time: string; baseCapacity: number }[] = [
  { time: "5:00 PM", baseCapacity: 4 },
  { time: "5:30 PM", baseCapacity: 3 },
  { time: "6:00 PM", baseCapacity: 5 },
  { time: "6:30 PM", baseCapacity: 2 },
  { time: "7:00 PM", baseCapacity: 1 },
  { time: "7:30 PM", baseCapacity: 0 }, // Fully booked sample
  { time: "8:00 PM", baseCapacity: 3 },
  { time: "8:30 PM", baseCapacity: 2 },
  { time: "9:00 PM", baseCapacity: 4 },
];

function getStoredReservations(): Reservation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RESERVATIONS));
      return INITIAL_RESERVATIONS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load reservations from localStorage", err);
    return INITIAL_RESERVATIONS;
  }
}

function saveStoredReservations(reservations: Reservation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  } catch (err) {
    console.error("Failed to save reservations to localStorage", err);
  }
}

export const reservationApi = {
  // Fetch all user reservations with mock latency
  async getReservations(): Promise<Reservation[]> {
    await new Promise((res) => setTimeout(res, 400));
    return getStoredReservations();
  },

  // Fetch real-time available slots for a date
  async getAvailableSlots(date: string): Promise<TimeSlot[]> {
    await new Promise((res) => setTimeout(res, 250));
    const allReservations = getStoredReservations();
    const activeForDate = allReservations.filter(
      (r) => r.date === date && r.status === "confirmed"
    );

    return DEFAULT_TIME_SLOTS.map((slot) => {
      const bookedCount = activeForDate.filter((r) => r.time === slot.time).length;
      const remaining = Math.max(0, slot.baseCapacity - bookedCount);

      let status: "available" | "limited" | "booked" = "available";
      if (remaining === 0) status = "booked";
      else if (remaining <= 2) status = "limited";

      return {
        time: slot.time,
        availableTables: remaining,
        status,
      };
    });
  },

  // Create a new reservation
  async createReservation(
    data: Omit<Reservation, "id" | "createdAt" | "status">
  ): Promise<Reservation> {
    await new Promise((res) => setTimeout(res, 750));
    const current = getStoredReservations();

    const newReservation: Reservation = {
      ...data,
      id: `VEL-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    const updated = [newReservation, ...current];
    saveStoredReservations(updated);
    return newReservation;
  },

  // Cancel reservation
  async cancelReservation(id: string): Promise<Reservation[]> {
    await new Promise((res) => setTimeout(res, 500));
    const current = getStoredReservations();
    const updated = current.map((resItem) =>
      resItem.id === id ? { ...resItem, status: "cancelled" as const } : resItem
    );
    saveStoredReservations(updated);
    return updated;
  },
};
