// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const apiSlice = createApi({
//    reducerPath: 'api',
//    baseQuery: fetchBaseQuery({
//       // baseUrl: 'https://soccer.sportmonks.com/api/v2.0/',
//       baseUrl: 'https://api.sportmonks.com/v3/football/'
//       // prepareHeaders: headers => {
//       //    headers.set('Accept', 'application/json');
//       //    return headers;
//       // }
//    }),
//    endpoints: builder => ({
//       getFixtures: builder.query({
//          query: pickedDate => ({
//             url: `fixtures/date/${pickedDate}`,
//             method: 'GET',
//             headers: {
//                'Content-type': 'application/json'
//             },
//             params: {
//                // include: 'localTeam,visitorTeam,league,venue,referee',
//                include: 'league.country;round.stage;participants;state;scores',
//                api_token: process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN
//             }
//          })
//       })
//    })
// });

// export const { useGetFixturesQuery } = apiSlice;

// export default apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
   baseUrl: 'https://turbosport.onrender.com/'
   // prepareHeaders: (headers, { getState }) => {
   //    headers.set('Content-Type', 'application/json');
   //    headers.set('X-API-KEY', process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN);
   //    console.log('Headers: ', headers);

   //    return headers;
   // }
   // baseUrl: 'https://api.sportmonks.com/v3/football/'
   // prepareHeaders: headers => {
   //    headers.set('Accept', 'application/json');
   //    headers.set('Content-Type', 'application/json');
   //    // headers.set('Access-Control-Allow-Headers', '*');
   //    headers.set('Access-Control-Allow-Origin', '*');
   //    // headers.set('Access-Control-Allow-Methods', '*');
   //    return headers;
   // }
});

const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery,
   tagTypes: ['Fixures', 'Match', 'AppSettings'],
   endpoints: builder => ({
      postFixures: builder.mutation({
         query: data => ({
            url: `fixtures`,
            method: 'POST',
            body: data,
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['Fixures']
      }),
      createMatch: builder.mutation({
         query: data => ({
            url: 'match',
            method: 'POST',
            body: data,
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['Match']
      }),
      getAllMatch: builder.query({
         query: () => ({
            url: 'matches',
            method: 'GET'
         }),
         providesTags: ['Match']
      }),
      allMatch: builder.mutation({
         query: data => ({
            url: 'matches',
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['Match']
      }),

      getSingleMatch: builder.query({
         query: matchId => {
            console.log('matchId', matchId);
            return {
               url: `/match/${matchId}`,
               method: 'GET',
               params: {
                  status: true
               }
            };
         },
         providesTags: ['Match']
      }),

      deleteMatch: builder.mutation({
         query: matchId => ({
            url: `/match/${matchId}`,
            method: 'DELETE',
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['Match']
      }),

      addAppSettings: builder.mutation({
         query: data => ({
            url: `app_settings`,
            method: 'POST',
            body: data,
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['AppSettings']
      }),
      getAppSettings: builder.query({
         query: () => ({
            url: `settings`,
            method: 'GET'
         }),
         providesTags: ['AppSettings']
      }),
      updateAppSettings: builder.mutation({
         query: data => ({
            url: `settings`,
            method: 'PUT',
            body: data,
            headers: {
               'Content-type': 'application/json'
            }
         }),
         invalidatesTags: ['AppSettings']
      }),

      addSearchFixtureHighlights: builder.mutation({
         query: data => {
            console.log('Query', data);

            return {
               url: `search/highlights`,
               method: 'POST',
               body: data,
               headers: {
                  'Content-type': 'application/json'
               }
            };
         },
         invalidatesTags: ['AppSettings']
      })
   })
});

export const {
   usePostFixuresMutation,
   useCreateMatchMutation,
   useAllMatchMutation,
   useDeleteMatchMutation,
   useGetAllMatchQuery,
   useGetSingleMatchQuery,
   useAddAppSettingsMutation,
   useGetAppSettingsQuery,
   useUpdateAppSettingsMutation,
   useAddSearchFixtureHighlightsMutation
} = apiSlice;

export default apiSlice;

// https://api.sportmonks.com/v3/football/fixtures/date/2023-06-04?api_token=pOrQiOGJTy3tZzq0WxrGevTckFeZZo1IuNJZYlwml7sfCh5pEvMwrTc1KIZf&include=league.country;round.stage;participants;state;scores;events.type&page=1
