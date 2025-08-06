import { ClientError, NetworkError, ServerError } from '@/lib/error';
import { cn } from '@/lib/tailwind-utils';
import { useServerHealth } from '@/requests/server-health';
import React, { useMemo } from 'react';

enum ServerStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

function HealthIndicator() {
  const { data, status, error } = useServerHealth();

  const serverStatus = useMemo(() => {
    if (status === 'pending') return ServerStatus.LOADING;
    if (status === 'error') return ServerStatus.ERROR;
    return data?.status === 'ok' ? ServerStatus.OK : ServerStatus.ERROR;
  }, [data, status]);

  const statusClasses = {
    [ServerStatus.OK]: 'bg-green-500',
    [ServerStatus.ERROR]: 'bg-red-500',
    [ServerStatus.LOADING]: 'bg-yellow-500',
  };

  const text = useMemo(() => {
    if (status === 'pending') {
      return 'Checking';
    }

    if (error instanceof NetworkError) {
      return 'Connection Failed';
    }

    if (error instanceof ClientError) {
      return 'Client Error';
    }

    if (error instanceof ServerError) {
      return `Server Error`;
    }

    return `GOOD`;
  }, [error, status]);

  return (
    <p className='p-4 flex items-center gap-1'>
      <span
        className={cn(
          'w-3 h-3 block rounded-full border-2 shrink-0 mx-auto md:mx-0',
          statusClasses[serverStatus]
        )}
      ></span>
      <span className='text-xs hidden md:block'>Server Status: {text}</span>
    </p>
  );
}

export default React.memo(HealthIndicator);
