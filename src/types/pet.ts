export interface PetDetails {
  _id: string;
  name: string;
  medical: Treatment[];
  members: Members[];
  tasks: Tasks[];
  birthdate: Date;
  breed: string;
  height: string;
  weight: string;
  imgUrl: string;
}

interface Treatment {
  _id: string;
  treatment: string;
  date: Date;
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
