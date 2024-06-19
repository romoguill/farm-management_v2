'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from 'src/trpc/server';

export default function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/trpc/healthcheck')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return <main>{JSON.stringify(data)}</main>;
}
