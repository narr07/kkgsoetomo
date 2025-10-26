import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { allMembersQuery } from '@/sanity/lib/queries';
import AnggotaClient from './anggota-client';

export default async function AnggotaPage() {
  const members = await sanityFetch({
    query: allMembersQuery,
    revalidate: 60,
  });

  return (
    <AnggotaClient members={members} />
  );
}
