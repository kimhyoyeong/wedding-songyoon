import React from 'react';
import AccountDropdown from './AccountDropdown';
import { brideAccountsBase, brideAccountVer1 } from '../data/accounts';

export default function BrideAccountsDropdown({ params }: { params: URLSearchParams | null }) {
  const accounts = [...(params?.has('ver1') ? [brideAccountVer1] : []), ...brideAccountsBase];
  return <AccountDropdown label="신부측 계좌번호" accounts={accounts} />;
}
