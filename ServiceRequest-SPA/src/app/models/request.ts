export interface Request {
  requestID: string;
  createdBy?: string;
  createdDate?: Date;
  requestDate: Date;
  title: string;
  location: string;
  description: string;
  deliverables: string;
  afe?: string;
  propertyCode?: number;
  engineerAssigned?: string;
  promiseDate?: Date;
  approved?: boolean;
  submitted?: boolean;
  approvedBudget?: number;
  expectedCost?: number;
  coupaDate?: Date;
  status?: string;
  acknowledged?: boolean;
  owner?: string;
  resolutionDate?: Date;
  comments?: any;
  attachments?: any;
}
