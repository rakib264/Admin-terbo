'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import {
   AdsStatus,
   AppDefaultPage,
   clickControl,
   ForceUpdate,
   HighlightsOptions,
   NotificationType,
   PublishControl,
   updateLocation
} from '@/components/helper/selectOptions';
import Input from '@/components/Input/InputCom';
import SearchCountry from '@/components/Input/SearchCountry';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/Textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loading from '@/components/Spinner/Loading';
import {
   useAddAppSettingsMutation,
   useGetAppSettingsQuery,
   useUpdateAppSettingsMutation
} from '@/features/api/apiSlice';
// import {
//    useAddAppSettingsMutation,
//    useGetAppSettingsQuery,
//    useUpdateAppSettingsMutation
// } from '@/features/api/apiSlice';
// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineHome } from 'react-icons/ai';
import { BsAndroid2, BsApple } from 'react-icons/bs';

const AppSettings = () => {
   const [isOperatingSystem, setIsOperatingSystem] = useState('Android');
   const [loadingState, setLoadingState] = useState(false);
   const [updateAndroidCountries, setUpdateAndroidCountries] = useState([]);
   const [updateIosCountries, setUpdateIosCountries] = useState([]);

   const [dataRender, setDataRender] = useState(false);

   const [
      addAppSettings,
      { data, isLoading: isAddLoading, isSuccess, isError }
   ] = useAddAppSettingsMutation();
   //console.log('Data: ', data);

   const {
      data: fetchedData,
      isLoading: isFetchedLoading,
      isSuccess: isDataFetchedSuccess,
      isError: isDataFetchedError,
      refetch
   } = useGetAppSettingsQuery();
   console.log('FetchedData:', fetchedData?.data);

   const finalFetchedData = fetchedData?.data;

   const [
      updateAppSettings,
      {
         data: updatedData,
         isLoading: isUpdateLoading,
         isSuccess: isUpdatedSuccess,
         isError: isUpdatedError
      }
   ] = useUpdateAppSettingsMutation();

   // // console.log('Updated :', updatedData);

   // const and_country_blockers =
   //    fetchedData?.data?.android_settings?.country_blockers;
   // const ios_country_blockers =
   //    fetchedData?.data?.ios_settings?.country_blockers;

   // useEffect(() => {
   //    setUpdateAndroidCountries(and_country_blockers);
   // }, [and_country_blockers]);

   // useEffect(() => {
   //    setUpdateIosCountries(ios_country_blockers);
   // }, [ios_country_blockers]);

   useEffect(() => {
      if (isUpdateLoading) {
         setLoadingState(true);
         // setRenderControl(false);
      }
      if (isUpdatedSuccess) {
         setLoadingState(false);
         refetch();
         //setDataRender(true);
         // setRenderControl(true);
         toast.success('Appsettings data updated successfully');
      }
      if (isUpdatedError) {
         toast.error('Something went wrong while updating appsettings');
      }
   }, [
      isUpdateLoading,
      isUpdatedSuccess,
      isUpdatedError,
      setLoadingState,
      toast,
      refetch
   ]);

   useEffect(() => {
      if (isFetchedLoading) {
         setLoadingState(true);
         // setRenderControl(false);
      }
      if (isDataFetchedSuccess) {
         setLoadingState(false);
         //setDataRender(true);
         toast.success('Appsettings data fetched successfully');
         // setRenderControl(true);
      }
      if (isDataFetchedError) {
         toast.error('Something went wrong while fetching appsettings');
      }
   }, [
      isFetchedLoading,
      isDataFetchedSuccess,
      isDataFetchedError,
      setLoadingState,
      toast
   ]);

   useEffect(() => {
      if (isAddLoading) {
         setLoadingState(true);
      }
      if (isSuccess) {
         setLoadingState(false);
         toast.success('Appsettings added successfully');
      }

      if (isError) {
         toast.error('Something went wrong while adding appsettings');
      }
   }, [isAddLoading, isSuccess, isError, setLoadingState, toast]);

   const {
      register,
      handleSubmit,
      formState,
      control,
      watch,
      setValue,
      reset
   } = useForm();

   const { errors } = formState;

   const notification_type = watch('notification_type');

   const onSubmit = data => {
      //console.log('Data: ', data);

      let finalResult = {};

      // finalResult.notification_type =
      //    data?.notification_type === 'One Signal'
      //       ? 'OneSignal'
      //       : data?.notification_type;
      finalResult.notification_type = data?.notification_type;
      finalResult.name = 'app_settings';
      if (data?.notification_type === 'OneSignal') {
         finalResult.one_signal_app_id = data?.one_signal_app_id;
         finalResult.one_signal_api_key = data?.one_signal_api_key;
         finalResult.firebase_key = '';
         finalResult.firebase_topics = '';
      } else {
         finalResult.firebase_key = data?.firebase_key;
         finalResult.firebase_topics = data?.firebase_topics;
         finalResult.one_signal_app_id = '';
         finalResult.one_signal_api_key = '';
      }

      finalResult.api_base_url = data?.api_base_url;
      finalResult.api_key = data?.api_key;

      let androidSettings = {
         privacy_policy: data?.android_privacy_policy,
         terms_condition: data?.android_terms_condition,
         app_share_link: data?.android_app_share_link,
         app_default_page: data?.android_app_default_page,
         app_publish_control: data?.android_app_publish_control,
         live_version_code: data?.android_live_version_code,
         highlights_type: data?.android_highlights_type,
         ads_status: data?.android_ads_status,
         click_control: data?.android_click_control,
         google_app_id: data?.android_google_app_id,
         google_app_ads_code: data?.android_google_app_ads_code,
         google_banner_ads_code: data?.android_google_banner_ads_code,
         google_interstitial_ads_code:
            data?.android_google_interstitial_ads_code,
         google_native_ads_code: data?.android_google_native_ads_code,
         google_rewarded_ads_code: data?.android_google_rewarded_ads_code,
         google_adaptive_interstitial_id:
            data?.android_google_adaptive_interstitial_id,
         version_code: data?.android_version_code,
         force_update: data?.android_force_update,
         country_blockers: data?.android_country_blockers,
         app_url: data?.android_app_url,
         button_text: data?.android_button_text,
         description: data?.android_description
      };

      let iosSettings = {
         privacy_policy: data?.ios_privacy_policy,
         terms_condition: data?.ios_terms_condition,
         app_share_link: data?.ios_app_share_link,
         app_rating_link: data?.ios_app_rating_link,
         app_default_page: data?.ios_app_default_page,
         app_publish_control: data?.ios_app_publish_control,
         live_version_code: data?.ios_live_version_code,
         highlights_type: data?.ios_highlights_type,
         ads_status: data?.ios_ads_status,
         click_control: data?.ios_click_control,
         google_app_id: data?.ios_google_app_id,
         google_app_ads_code: data?.ios_google_app_ads_code,
         google_banner_ads_code: data?.ios_google_banner_ads_code,
         google_interstitial_ads_code: data?.ios_google_interstitial_ads_code,
         google_native_ads_code: data?.ios_google_native_ads_code,
         google_rewarded_ads_code: data?.ios_google_rewarded_ads_code,
         google_adaptive_interstitial_id:
            data?.ios_google_adaptive_interstitial_id,
         version_code: data?.ios_version_code,
         force_update: data?.ios_force_update,
         country_blockers: data?.ios_country_blockers,
         app_url: data?.ios_app_url,
         button_text: data?.ios_button_text,
         description: data?.ios_description
      };

      finalResult.android_settings = androidSettings;
      finalResult.ios_settings = iosSettings;

      //console.log('Final', finalResult);

      try {
         //addAppSettings(finalResult);
         if (finalFetchedData !== null) {
            // console.log('Final Result:', finalResult);
            //Update Handler
            updateAppSettings(finalResult);
         } else {
            //Post handler
            addAppSettings(finalResult);
            reset();
         }
      } catch (err) {
         console.log('Error: ', err);
      }
   };

   const handleOperatingSystem = e => {
      setIsOperatingSystem('IOS');
   };

   return (
      <DashboardLayout>
         <div className='px-8 py-4'>
            <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
               <h3 className='text-xl text-gray-800 font-bold'>App Settings</h3>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='App Settings'
                  rootHref='/manage/app'
               />
            </div>
         </div>
         {loadingState === true ? (
            <Loading />
         ) : (
            <form
               className='flex flex-col gap-8'
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2'>
                           <Select
                              label='Notification Type'
                              option={NotificationType}
                              register={register}
                              id='notification_type'
                              required={true}
                              errors={errors}
                              defaultValue={finalFetchedData?.notification_type}
                              setValue={setValue}
                           />
                        </div>
                     </div>

                     {notification_type === 'OneSignal' && (
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                           {/* {console.log(
                           'APP Id',
                           finalFetchedData?.one_signal_app_id
                        )}
                        {console.log(
                           'APP Key',
                           finalFetchedData?.one_signal_app_key
                        )} */}

                           <div className='col-span-2 lg:col-span-1'>
                              <Input
                                 label='One Signal App Id'
                                 id='one_signal_app_id'
                                 required
                                 register={register}
                                 errors={errors}
                                 defaultValue={
                                    finalFetchedData?.one_signal_app_id
                                 }
                                 setValue={setValue}
                              />
                           </div>
                           <div className='col-span-2 lg:col-span-1'>
                              <Input
                                 label='One Signal Api Key'
                                 id='one_signal_api_key'
                                 required
                                 register={register}
                                 errors={errors}
                                 defaultValue={
                                    finalFetchedData?.one_signal_api_key
                                 }
                                 setValue={setValue}
                              />
                           </div>
                        </div>
                     )}

                     {notification_type === 'FCM' && (
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                           <div className='col-span-2 lg:col-span-1'>
                              <Input
                                 label='Firebase Server Key'
                                 id='firebase_key'
                                 required
                                 register={register}
                                 errors={errors}
                                 defaultValue={finalFetchedData?.firebase_key}
                                 setValue={setValue}
                              />
                           </div>
                           <div className='col-span-2 lg:col-span-1'>
                              <Input
                                 label='Firebase Topics'
                                 id='firebase_topics'
                                 required
                                 register={register}
                                 errors={errors}
                                 defaultValue={
                                    finalFetchedData?.firebase_topics
                                 }
                                 setValue={setValue}
                              />
                           </div>
                        </div>
                     )}

                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input
                              label='Sports Api Based Url'
                              id='api_base_url'
                              required
                              register={register}
                              errors={errors}
                              defaultValue={finalFetchedData?.api_base_url}
                              setValue={setValue}
                           />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input
                              label='Sports Api Key'
                              id='api_key'
                              required
                              register={register}
                              errors={errors}
                              defaultValue={finalFetchedData?.api_key}
                              setValue={setValue}
                           />
                        </div>
                     </div>
                  </div>

                  <div className='flex flex-col gap-4 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                     <div className='flex items-center justify-center'>
                        <div className='flex items-center gap-3'>
                           <div
                              onClick={e => setIsOperatingSystem('Android')}
                              className={`w-28 h-28 flex flex-col items-center
                         justify-center rounded-md 
                         ${
                            isOperatingSystem === 'Android'
                               ? 'bg-purple-700 text-white'
                               : 'bg-purple-50 text-gray-800'
                         } p-3`}
                           >
                              <BsAndroid2 className='w-8 h-8' />
                              <div className='pt-3'>Android</div>
                           </div>
                           <div
                              onClick={e => handleOperatingSystem(e)}
                              className={`w-28 h-28 flex flex-col items-center
                         justify-center rounded-md 
                         ${
                            isOperatingSystem === 'IOS'
                               ? 'bg-purple-700 text-white'
                               : 'bg-purple-50 text-gray-800'
                         } p-3`}
                           >
                              <BsApple className='w-8 h-8' />
                              <div className='pt-3'>IOS</div>
                           </div>
                        </div>
                     </div>

                     {/*  Abdroid Settings starts */}

                     {isOperatingSystem === 'Android' && (
                        <div className='flex flex-col gap-6'>
                           {/* General Settings Starts */}
                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 General Settings
                              </h3>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='Privacy Policy'
                                       id='android_privacy_policy'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.privacy_policy
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='Terms And Condition'
                                       id='android_terms_condition'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.terms_condition
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='App Share Link'
                                       id='android_app_share_link'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.app_share_link
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* General Settings ends */}

                           {/* App control starts */}

                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 App Control
                              </h3>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='grid grid-cols-1 shadow-gray-500'>
                                    <div className='col-span-1'>
                                       <Select
                                          label='App Default Page'
                                          option={AppDefaultPage}
                                          register={register}
                                          id='android_app_default_page'
                                          required={true}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData?.android_settings
                                                ?.app_default_page
                                          }
                                          setValue={setValue}
                                       />
                                    </div>
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='App Publishing Control'
                                       id='android_app_publish_control'
                                       required
                                       register={register}
                                       errors={errors}
                                       option={PublishControl}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.app_publish_control
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className=''>
                                 <div className='grid grid-cols-2 gap-6 pt-4'>
                                    <div className='col-span-2 lg:col-span-1'>
                                       <Input
                                          label='Live Control By Version Code'
                                          id='android_live_version_code'
                                          required
                                          register={register}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData
                                                ? finalFetchedData
                                                     ?.android_settings
                                                     ?.live_version_code
                                                : 0
                                          }
                                          setValue={setValue}
                                          type='number'
                                       />
                                    </div>
                                    <div className='col-span-2 lg:col-span-1'>
                                       <Select
                                          label='Highlights'
                                          option={HighlightsOptions}
                                          register={register}
                                          id='android_highlights_type'
                                          required={true}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData?.android_settings
                                                ?.highlights_type
                                          }
                                          setValue={setValue}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* App Control ends */}

                           {/* Ads control starts */}
                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <div className='border-[1px] border-gray-200 px-5 py-4 rounded-md'>
                                 <h3 className='text-lg text-gray-800 font-bold'>
                                    Ads Control
                                 </h3>

                                 <div className='flex flex-col gap-4 pt-4'>
                                    <div className='grid grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Select
                                             label='Ads Status'
                                             option={AdsStatus}
                                             register={register}
                                             id='android_ads_status'
                                             required={true}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.ads_status
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Select
                                             label='Click Control'
                                             option={clickControl}
                                             register={register}
                                             id='android_click_control'
                                             required={true}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.click_control
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>

                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google App Id'
                                             id='android_google_app_id'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_app_id
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google AppOpen Ads Code'
                                             id='android_google_app_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_app_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Banner Ads Code'
                                             id='android_google_banner_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_banner_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Interstitial Ads Code'
                                             id='android_google_interstitial_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_interstitial_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Native Ads Code'
                                             id='android_google_native_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_native_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>

                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Rewarded Ads Code'
                                             id='android_google_rewarded_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_rewarded_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Adaptive Interstitial Id'
                                             id='android_google_adaptive_interstitial_id'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData
                                                   ?.android_settings
                                                   ?.google_adaptive_interstitial_id
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* Ads control ends */}

                           {/* Version Control starts */}
                           <div className='flex flex-col gap-4 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 Version Control
                              </h3>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='Version Code'
                                       id='android_version_code'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.version_code
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='Force Update'
                                       option={ForceUpdate}
                                       register={register}
                                       id='android_force_update'
                                       required={true}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.force_update
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>

                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='Update Location'
                                       option={updateLocation}
                                       register={register}
                                       id='android_update_location'
                                       required={true}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.update_location
                                       }
                                       setValue={setValue}
                                    />
                                 </div>

                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='App Url '
                                       id='android_app_url'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.app_url
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='Button Text'
                                       id='android_button_text'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.button_text
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <TextArea
                                       label='Description'
                                       id='android_description'
                                       required
                                       register={register}
                                       errors={errors}
                                       topLabel='Description'
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.description
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* Version Control ends */}

                           {/* Country Block Starts */}

                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 County Block Control
                              </h3>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <SearchCountry
                                       id='android_country_blockers'
                                       required={true}
                                       register={register}
                                       errors={errors}
                                       // defaultValue={
                                       //    finalFetchedData?.android_settings
                                       //       ?.country_blockers
                                       // }
                                       defaultValue={
                                          finalFetchedData?.android_settings
                                             ?.country_blockers
                                       }
                                       setValue={setValue}
                                    />
                                    {/* {dataRender === true && (
                                       <SearchCountry
                                          id='android_country_blockers'
                                          required={true}
                                          register={register}
                                          errors={errors}
                                          // defaultValue={
                                          //    finalFetchedData?.android_settings
                                          //       ?.country_blockers
                                          // }
                                          defaultValue={updateAndroidCountries}
                                          setValue={setValue}
                                       />
                                    )} */}
                                    {/* <SearchCountry
                                    id='android_country_blockers'
                                    required={true}
                                    register={register}
                                    errors={errors}
                                    // defaultValue={
                                    //    finalFetchedData?.android_settings
                                    //       ?.country_blockers
                                    // }
                                    setValue={setValue}
                                 /> */}
                                 </div>
                              </div>
                           </div>

                           {/* Country blocks ends */}
                        </div>
                     )}

                     {/*  Abdroid Settings ends */}

                     {/*  IOS Settings starts */}

                     {isOperatingSystem === 'IOS' && (
                        <div className='flex flex-col gap-6'>
                           <div className='flex flex-col gap-4 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 General Settings
                              </h3>
                              {/* General Settings Starts */}
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='Privacy Policy'
                                       id='ios_privacy_policy'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.privacy_policy
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='Terms And Condition'
                                       id='ios_terms_condition'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.terms_condition
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-1'>
                                    <Input
                                       label='App Share Link'
                                       id='ios_app_share_link'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.app_share_link
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* General Settings ends */}

                           {/* App Control starts */}

                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 App Control
                              </h3>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='grid grid-cols-1 shadow-gray-500'>
                                    <div className='col-span-1'>
                                       <Select
                                          label='App Default Page'
                                          option={AppDefaultPage}
                                          register={register}
                                          id='ios_app_default_page'
                                          required={true}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData?.ios_settings
                                                ?.app_default_page
                                          }
                                          setValue={setValue}
                                       />
                                    </div>
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='App Publishing Control'
                                       id='ios_app_publish_control'
                                       required
                                       register={register}
                                       errors={errors}
                                       option={PublishControl}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.app_publish_control
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className=''>
                                 <div className='grid grid-cols-2 gap-6 pt-4'>
                                    <div className='col-span-2 lg:col-span-1'>
                                       <Input
                                          label='Live Control By Version Code'
                                          id='ios_live_version_code'
                                          required
                                          register={register}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData
                                                ? finalFetchedData?.ios_settings
                                                     ?.live_version_code
                                                : 0
                                          }
                                          setValue={setValue}
                                          type='number'
                                       />
                                    </div>
                                    <div className='col-span-2 lg:col-span-1'>
                                       <Select
                                          label='Highlights'
                                          option={HighlightsOptions}
                                          register={register}
                                          id='ios_highlights_type'
                                          required={true}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData?.ios_settings
                                                ?.highlights_type
                                          }
                                          setValue={setValue}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* App Control ends */}

                           {/* Ads Control Starts */}
                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <div className='border-[1px] border-gray-200 px-5 py-4 rounded-md'>
                                 <h3 className='text-lg text-gray-800 font-bold'>
                                    Ads Control
                                 </h3>

                                 <div className='flex flex-col gap-4 pt-4'>
                                    <div className='grid grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Select
                                             label='Ads Status'
                                             option={AdsStatus}
                                             register={register}
                                             id='ios_ads_status'
                                             required={true}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.ads_status
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Select
                                             label='Click Control'
                                             option={clickControl}
                                             register={register}
                                             id='ios_click_control'
                                             required={true}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.click_control
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>

                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google App Id'
                                             id='ios_google_app_id'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_app_id
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google AppOpen Ads Code'
                                             id='ios_google_app_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_app_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Banner Ads Code'
                                             id='ios_google_banner_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_banner_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Interstitial Ads Code'
                                             id='ios_google_interstitial_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_native_ads_code
                                             }
                                             setValue={setValue}
                                             //
                                          />
                                       </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Native Ads Code'
                                             id='ios_google_native_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_native_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>

                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Rewarded Ads Code'
                                             id='ios_google_rewarded_ads_code'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_rewarded_ads_code
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                       <div className='col-span-2 lg:col-span-1'>
                                          <Input
                                             label='Google Adaptive Interstitial Id'
                                             id='ios_google_adaptive_interstitial_id'
                                             required
                                             register={register}
                                             errors={errors}
                                             defaultValue={
                                                finalFetchedData?.ios_settings
                                                   ?.google_adaptive_interstitial_id
                                             }
                                             setValue={setValue}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* Ads Control ends */}

                           {/* Version Control starts */}
                           <div className='flex flex-col gap-4 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 Version Control
                              </h3>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='Version Code'
                                       id='ios_version_code'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.version_code
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='Force Update'
                                       option={ForceUpdate}
                                       register={register}
                                       id='ios_force_update'
                                       required={true}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.force_update
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>

                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Select
                                       label='Update Location'
                                       option={updateLocation}
                                       register={register}
                                       id='ios_update_location'
                                       required={true}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.update_location
                                       }
                                       setValue={setValue}
                                    />
                                 </div>

                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='App Url '
                                       id='ios_app_url'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.app_url
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                              <div className='grid grid-cols-2 gap-6 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <Input
                                       label='Button Text'
                                       id='ios_button_text'
                                       required
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.button_text
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <TextArea
                                       label='Description'
                                       id='ios_description'
                                       required
                                       register={register}
                                       errors={errors}
                                       topLabel='Description'
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.description
                                       }
                                       setValue={setValue}
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* Version Control ends */}

                           {/* Country Block Starts */}

                           <div className='flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                              <h3 className='text-lg text-gray-800 font-bold'>
                                 County Block Control
                              </h3>
                              <div className='grid grid-cols-1 shadow-gray-500'>
                                 <div className='col-span-2 lg:col-span-1'>
                                    <SearchCountry
                                       id='ios_country_blockers'
                                       required={true}
                                       register={register}
                                       errors={errors}
                                       defaultValue={
                                          finalFetchedData?.ios_settings
                                             ?.country_blockers
                                       }
                                       setValue={setValue}
                                    />
                                    {/* {dataRender === true && (
                                       <SearchCountry
                                          id='ios_country_blockers'
                                          required={true}
                                          register={register}
                                          errors={errors}
                                          defaultValue={
                                             finalFetchedData?.ios_settings
                                                ?.country_blockers
                                          }
                                          setValue={setValue}
                                       />
                                    )} */}
                                    {/* <SearchCountry
                                    id='ios_country_blockers'
                                    required={true}
                                    register={register}
                                    errors={errors}
                                    defaultValue={
                                       finalFetchedData?.ios_settings
                                          ?.country_blockers
                                    }
                                    setValue={setValue}
                                 /> */}
                                 </div>
                              </div>
                           </div>

                           {/* Country blocks ends */}
                        </div>
                     )}

                     {/*  IOS Settings ends */}
                  </div>
               </div>
               <button
                  type='submit'
                  className='bg-cyan-600 px-4 py-2 text-white text-md rounded-md'
               >
                  {/* {finalFetchedData !== null ? 'Update' : 'Submit'} */}
                  Submit
               </button>
            </form>
         )}
      </DashboardLayout>
   );
};

export default AppSettings;
