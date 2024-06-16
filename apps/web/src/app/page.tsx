import Image from 'next/image';
import { api } from 'src/trpc/server';

export default async function Home() {
  const check = await api.healthcheck();

  return <main>{check.status}</main>;
}
