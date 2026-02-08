// Types pour l'application FlexOffice

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'manager' | 'admin' | 'visitor';
  company: string;
  phone?: string;
  avatar?: string;
}

export interface Space {
  id: string;
  name: string;
  type: 'desk' | 'meeting_room' | 'collaborative_space';
  capacity: number;
  floor: number;
  building: string;
  description?: string;
  image?: string;
  equipment: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  spaceId: string;
  space?: Space;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
  qrCode?: string;
  createdAt: string;
}

export interface Access {
  id: string;
  bookingId: string;
  qrCode: string;
  validFrom: string;
  validUntil: string;
}

export interface DashboardStats {
  availableSpaces: number;
  activeBookings: number;
  occupancyRate: number;
  totalBookings: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface BookingCreateData {
  spaceId: string;
  startTime: string;
  endTime: string;
}
