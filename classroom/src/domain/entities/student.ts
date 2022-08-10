import crypto from 'node:crypto';

type StudentsProps = {
  name: string;
};

export type Commons = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type IStudent = StudentsProps & Commons;

export class Student implements IStudent {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: StudentsProps, commons?: Partial<Commons>) {
    this.id = commons?.id || crypto.randomUUID();

    Object.assign(this, props);

    this.createdAt = commons?.createdAt || new Date();
    this.updatedAt = commons?.updatedAt || new Date();
  }
}
