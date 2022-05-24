export interface Pet {
  _id: string;
  name: string;
  medical: Treatment[];
  members: Member[];
  tasks: Task[];
  birthdate: Date;
  breed: string;
  height: string;
  weight: string;
  imgUrl: string;
}

export interface Treatment {
  _id: string;
  treatment: string;
  date: Date;
}

interface Member {
  _id: string;
  isAdmin: boolean;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  isCompleted: boolean;
}
