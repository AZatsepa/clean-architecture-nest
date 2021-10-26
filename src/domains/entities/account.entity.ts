import { MoneyEntity } from './money.entity';
import { ActivityEntity } from './activity.entity';
import { ActivityWindowEntity } from './activity-window.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity,
    private readonly _activityWindow: ActivityWindowEntity,
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  get activityWindow(): ActivityWindowEntity {
    return this._activityWindow;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this.baseLineBalance,
      this.activityWindow.calculateBalance(this.id),
    );
  }

  public withDraw(money: MoneyEntity, targetAccountId: AccountId): boolean {
    if (this._mayWithDrawMoney(money)) {
      return false;
    }

    const withDrawal: ActivityEntity = new ActivityEntity(
      this.id,
      targetAccountId,
      new Date(),
      money,
    );

    this.activityWindow.addActivity(withDrawal);
    return true;
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId): boolean {
    const deposit: ActivityEntity = new ActivityEntity(
      this.id,
      sourceAccountId,
      new Date(),
      money,
    );
    this.activityWindow.addActivity(deposit);
    return true;
  }

  private _mayWithDrawMoney(money: MoneyEntity): boolean {
    return MoneyEntity.add(
      this.calculateBalance(),
      money.negate(),
    ).isPositiveOrZero();
  }
}
