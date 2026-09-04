import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { KpiFactory } from "./classes/kpifactory";
import { KpiService } from "./kpi.service";
import { AalmaScore } from "./classes/aalmascore";
import { Team } from "typeorm/entities/Team";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { KpiDetailBodyDto } from "./dto/kpi.detail";
import { KpiScoreResponseDto } from "./dto/kpi.response";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  ADMIN_ROLE_ID,
  CEO_ROLE_ID,
  HR_ROLE_ID,
  MANAGER_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";
import { KpiRecommandedActionsDto } from "./dto/kpi.recommanded-actions";
import { ActionService } from "src/action/action.service";
import { KpiImpactResponseDto } from "./dto/kpi.impact";

@Controller("kpi")
@ApiTags("KPI")
export class KpiController {
  constructor(private readonly kpiService: KpiService, protected actionService:ActionService) {}
  @Post("detail/:kpiType")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    MANAGER_ROLE_ID,
    CEO_ROLE_ID,
  ])
  @ApiOperation({
    summary: "Calcul d'un KPI spécifique",
    description:
      "Retourne la valeur calculée d'un KPI donné pour une période et une company.",
  })
  @ApiParam({
    name: "kpiType",
    description: "Type de KPI à calculer",
    example: "stress",
  })
  @ApiBody({ type: KpiDetailBodyDto })
  @ApiResponse({
    status: 200,
    description: "Valeur du KPI sous forme de chaîne",
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: "kpiType inconnu ou paramètres invalides",
  })
  async findOne(
    @Param("kpiType") kpiType: string,
    @Body() body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
      const factory = new KpiFactory(this.actionService); 

    const kpi = factory.create(kpiType);
    if (kpi) {
      return `${await kpi.getCalcul(
        body.startDate,
        body.endDate,
        body.companyId,
        body.teamId ?? undefined,
      )}`;
    }
  }

  @Post("score")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    MANAGER_ROLE_ID,
    CEO_ROLE_ID,
  ])
  @ApiOperation({
    summary: "Score Aalma global",
    description:
      "Calcule le score Aalma, l'ensemble des KPIs, l'évolution par rapport à la période précédente, et les équipes les moins performantes (si aucune équipe n'est ciblée).",
  })
  @ApiBody({ type: KpiDetailBodyDto })
  @ApiResponse({
    status: 200,
    description: "Score et KPIs calculés",
    type: KpiScoreResponseDto,
  })
  async score(
    @Body() body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    body.startDate = new Date(body.startDate);
    body.endDate = new Date(body.endDate);
    const response: {
      aalma_score: number;
      kpis: Record<string, number>;
      evolution_score: number;
      worst_team?: { team: Team; score: number }[];
    } = {
      aalma_score: 0,
      kpis: {},
      evolution_score: 0,
    };
    const factory = new KpiFactory(this.actionService);
    const score = factory.create("aalma");

    // Aalma Score
    response.aalma_score = await score?.getCalcul(
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );

    // Worst teams
    if (!body.teamId) {
      response.worst_team = await this.kpiService.worstTeam(
        body.startDate,
        body.endDate,
        body.companyId,
      );
    }

    //All KPIs in name=>value
    response.kpis = await this.kpiService.allKPI(
      factory,
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );

    // Aora score diff previous period
    response.evolution_score = await score?.getEvolution(
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );
    return response;
  }
  
  @Post("recommanded-actions")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    MANAGER_ROLE_ID,
    CEO_ROLE_ID,
  ])
  @ApiOperation({
    summary: "Actions recommandées",
    description:
      "Calcule l'ensemble des KPIs, regarde si elles sont au-dessus du seuil de danger. Si oui, liste les actions recommandées",
  })
  @ApiBody({ type: KpiDetailBodyDto })
  @ApiResponse({
    status: 200,
    description: "Actions recommandées",
    type: KpiRecommandedActionsDto,
  })
  async recommandedActions(
    @Body() body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    body.startDate = new Date(body.startDate);
    body.endDate = new Date(body.endDate);
    const response: KpiRecommandedActionsDto = {
      actions: []
    };
    const factory = new KpiFactory(this.actionService);

    response.actions = await this.kpiService.recommandedActions(
      factory,
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );
    return response;
  }
  @Post("impact")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    MANAGER_ROLE_ID,
    CEO_ROLE_ID,
  ])
  @ApiOperation({
    summary: "Impact - évolution du score global et des KPIs les plus impactants",
    description:
      "Calcule le score Aalma et son évolution par rapport à la période précédente, ainsi que les 2 KPIs ayant le plus évolué (positivement ou négativement) sur la période.",
  })
  @ApiBody({ type: KpiDetailBodyDto })
  @ApiResponse({
    status: 200,
    description: "Score global, son évolution, et les 2 KPIs les plus impactants",
    type: KpiImpactResponseDto,
  })
  async impact(
    @Body() body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    body.startDate = new Date(body.startDate);
    body.endDate = new Date(body.endDate);

    const factory = new KpiFactory(this.actionService);
    const aalma = factory.create("aalma");

    const response: KpiImpactResponseDto = {
      aalma_score: 0,
      evolution_score: 0,
      top_kpis: [],
    };

    response.aalma_score = await aalma?.getCalcul(
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );

    const biggestEvolutions = await this.kpiService.biggestEvolution(
      factory,
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );
    response.top_kpis = biggestEvolutions.slice(0, 2);

    response.evolution_score = await aalma?.getEvolution(
      body.startDate,
      body.endDate,
      body.companyId,
      body.teamId ?? undefined,
    );

    return response;
  }
}
