import { Injectable } from "@nestjs/common";
import { ActionService } from "src/action/action.service";
import { WorkLoad } from "./workload";
import { Stress } from "./stress";
import { Recognition } from "./recognition";
import { TeampSpirit } from "./teamspirit";
import { WorkBalance } from "./workbalance";
import { Commitment } from "./commitment";
import { AalmaScore } from "./aalmascore";

@Injectable()
export class KpiFactory {
  constructor(private readonly actionService: ActionService) {}

  create(type: string) {
    switch (type) {
      case "workload":
        return new WorkLoad(this.actionService);
      case "stress":
        return new Stress(this.actionService);
      case "recognition":
        return new Recognition(this.actionService);
      case "teamspirit":
        return new TeampSpirit(this.actionService);
      case "workbalance":
        return new WorkBalance(this.actionService);
      case "commitment":
        return new Commitment(this.actionService);
      case "aalma":
        return new AalmaScore(this.actionService);
      default:
        throw new Error(`Unknown KPI type: ${type}`);
    }
  }
}