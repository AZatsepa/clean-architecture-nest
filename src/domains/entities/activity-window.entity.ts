import { ActivityEntity } from './activity.entity';
import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export class ActivityWindowEntity {
  private readonly _activities: ActivityEntity[];

  get activities(): ActivityEntity[] {
    return this._activities;
  }

  addActivity(activity: ActivityEntity): ActivityWindowEntity {
    this.activities.push(activity);
    return this;
  }

  public calculateBalance(accountId: AccountId): MoneyEntity {
    const depositeBalance: MoneyEntity = this.activities
      .filter(
        (activity: ActivityEntity) => activity.targetAccountId === accountId,
      )
      .map((activity: ActivityEntity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    const withDrawalBalance: MoneyEntity = this.activities
      .filter(
        (activity: ActivityEntity) => activity.sourceAccountId === accountId,
      )
      .map((activity: ActivityEntity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    return MoneyEntity.add(depositeBalance, withDrawalBalance.negate());
  }
}
