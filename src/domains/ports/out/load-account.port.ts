import { AccountId, AccountEntity } from '../../entities/account.entity';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId): AccountEntity;
}
