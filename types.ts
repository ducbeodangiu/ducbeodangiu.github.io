
export enum HealthStatus {
  Underweight = 'Gầy',
  Normal = 'Bình thường',
  Overweight = 'Thừa cân',
  Obese = 'Béo phì'
}

export interface BmiResult {
  bmi: number;
  status: HealthStatus;
  advice: string;
  color: string;
}
