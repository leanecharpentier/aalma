import { Injectable } from "@nestjs/common";

@Injectable()
export class KpiService {
  getStressLevel() {
    const data = Array.from({ length: 50 }, () => ({
      stress: Math.floor(Math.random() * 10) + 1,
    }));
    const mean = data.reduce((n, { stress }) => n + stress, 0) / data.length;
    let message = "Stress levels are normals";
    let state = "normal";
    if (mean > 6) {
      message = "Stress levels are over the limit";
      state = "alert";
    }
    return {
      message,
      state,
      score: `${Math.round(mean * 100) / 100}/10`,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} kpi`;
  }
}
