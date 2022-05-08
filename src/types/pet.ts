export interface PetDetails {
  name: string;
  medical: {
    treatment: string;
    date: Date;
  };
  members: Members[];
  tasks: Tasks[];
  birthdate: Date;
  breed: string;
  height: string;
  weight: string;
}

interface Members {
  _id: string;
  isAdmin: boolean;
}

interface Tasks {
  _id: string;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  isCompleted: boolean;
}
