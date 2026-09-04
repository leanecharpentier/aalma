import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AppDataSource } from "DataSource";
import { Form } from "typeorm/entities/Form";
import { User } from "typeorm/entities/User";

@Injectable()
export class NotificationService {
  /**
   * Notifie les utilisateurs des nouveaux formulaires disponibles.
   */
  @Cron("0 8 * * *")
  async notifyUsersAboutNewForms() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formsStartingToday = await AppDataSource.getRepository(Form)
      .createQueryBuilder("form")
      .where("form.startDate >= :today", { today })
      .andWhere("form.startDate < :tomorrow", { tomorrow })
      .getMany();

    for (const form of formsStartingToday) {
      const usersToNotify = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .leftJoin("user.answers", "answer", "answer.form_id = :formId", {
          formId: form.id,
        })
        .where("user.company_id = :companyId", { companyId: form.company_id })
        .andWhere("answer.id IS NULL")
        .getMany();

      for (const user of usersToNotify) {
        await this.sendNotification(user, form);
      }
    }
  }

  /**
   * Envoie une notification à un utilisateur pour l'informer qu'un formulaire est disponible.
   * @param user Utilisateur à notifier
   * @param form Formulaire nouvellement disponible
   */
  private async sendNotification(user: User, form: Form) {
    await AppDataSource.query(
      `
      INSERT INTO notification (user_id, message, type, created_at)
      VALUES ($1, $2, $3, NOW())
    `,
      [
        user.id,
        `Le formulaire "${form.name}" est maintenant disponible`,
        "form_available",
      ],
    );
  }

  /**
   * Envoie une nouvelle notification à un utilisateur n'ayant pas encore répondu à un formulaire.
   * @param user Utilisateur à notifier
   * @param form Formulaire auquel l'utilisateur doit répondre
   */
  public async callAgain(user: User, form: Form) {
    await AppDataSource.query(
      `
      INSERT INTO notification (user_id, message, type, created_at)
      VALUES ($1, $2, $3, NOW())
    `,
      [
        user.id,
        `Vous n'avez toujours pas répondu au formuulaire "${form.name}", merci de le faire`,
        "form_available",
      ],
    );
  }
}