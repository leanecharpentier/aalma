import { AalmaScore } from "./aalmascore";
import { Commitment } from "./commitment";
import { Recognition } from "./recognition";
import { Stress } from "./stress";
import { TeampSpirit } from "./teamspirit";
import { WorkBalance } from "./workbalance";
import { WorkLoad } from "./workload";

export class KpiFactory {
  create(type: string) {
    switch (type) {
      case "workload":
        return new WorkLoad();
      case "stress":
        return new Stress();
      case "recognition":
        return new Recognition();
      case "teamspirit":
        return new TeampSpirit();
      case "workbalance":
        return new WorkBalance();
      case "commitment":
        return new Commitment();
      case "aalmascore":
        return new AalmaScore();
    }
  }
}
