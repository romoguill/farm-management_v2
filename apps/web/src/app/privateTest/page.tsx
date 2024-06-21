'use client';

import { api } from 'src/trpc/react';

function page() {
  const { data, error } = api.auth.me.useQuery();
  return (
    <div>
      <p>error {error?.message}</p>
      <p>data {data?.user.username}</p>
    </div>
  );
}
export default page;
