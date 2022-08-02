import React, { useRef, useId, useEffect } from 'react';

// hooks
import { fetchNftList, useNftListQuery } from '@api/queries';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

// compoments
import { StoriesCard } from '@components/ui/Card';
import { Header } from '@components/ui/Header';
import { AppShell, SimpleGrid } from '@mantine/core';

// react-query
import { dehydrate, QueryClient } from '@tanstack/react-query';

// api
import { client } from '@api/client';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { GetServerSidePropsContext } from 'next';
import { Layout } from '@components/ui/Layout';
import { useMount } from 'react-use';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  //   const queryClient = new QueryClient();

  //   const cookie = ctx.req ? ctx.req.headers.cookie : '';
  //   if (client.defaults.headers) {
  //     (client.defaults.headers as any).Cookie = '';
  //     if (ctx.req && cookie) {
  //       (client.defaults.headers as any).Cookie = cookie;
  //     }
  //   }

  //   await queryClient.prefetchInfiniteQuery(
  //     [API_ENDPOINTS.LOCAL.STORY.ROOT],
  //     fetchNftList,
  //   );

  //   return {
  //     props: {
  //       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
  //     },
  //   };
  return {
    props: {},
  };
};

const IndexPage = () => {
  // const { data, fetchNextPage, hasNextPage } = useNftListQuery();

  // const ref = useRef<HTMLDivElement | null>(null);

  // useIntersectionObserver({
  //   target: ref,
  //   onIntersect: fetchNextPage,
  //   enabled: hasNextPage,
  // });

  // const id = useId();

  return (
    <Layout>
      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1600, cols: 4, spacing: 'md' },
          { maxWidth: 1024, cols: 3, spacing: 'md' },
          { maxWidth: 768, cols: 2, spacing: 'sm' },
          { maxWidth: 480, cols: 1, spacing: 'sm' },
        ]}
      >
        {/* {data?.pages.map((item) => (
          <React.Fragment key={`item-grid-wrapper-${id}`}>
            {item.list.map((story) => (
              <StoriesCard
                item={story}
                key={`stories-item-grid-${story.id}-${id}`}
              />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`loading-key-${id}`}
              ref={index === 0 ? ref : undefined}
            />
          ))} */}
      </SimpleGrid>
    </Layout>
  );
};

export default IndexPage;
