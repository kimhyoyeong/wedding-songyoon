import React from 'react';
import AccountDropdown from './AccountDropdown';

export default function BrideAccountsDropdown({ params }: { params: URLSearchParams | null }) {
  const accounts = [
    ...(params?.has('ver1')
      ? [{ bank: '카카오뱅크', number: '1111111-111111', name: '백주선' }]
      : []),
    { bank: '카카오뱅크', number: '1111111-111111', name: '송영미' },
    { bank: '신한은행', number: '110-475-887415', name: '김송희' },
  ];
  return <AccountDropdown label="신부측 계좌번호" accounts={accounts} />;
}
