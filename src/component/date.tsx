'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getClientDate = () =>
  new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });

const getServerDate = () => '';

const CurrentDate = ({
  className = 'text-xs text-base-content/60',
}: {
  className?: string;
}) => {
  const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  return <p className={`min-h-[1.25rem] ${className}`}>{date}</p>;
};

export default CurrentDate;
