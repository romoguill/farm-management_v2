'use client';

import { useEffect, useState } from 'react';
import { api } from 'src/trpc/react';

export default function Home() {
  const { data } = api.healthcheck.useQuery();

  return <main>{JSON.stringify(data)}</main>;
}
