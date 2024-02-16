import React, { useEffect, useState } from 'react';
import useGetTimesheets from '../hooks/useGetTimesheets';
import { ITimesheets } from '../models/Timesheets.type';
import { TimesheetsProvider } from '../context/Timesheets.context';
import TimesheetsTable from '../components/TimesheetsTable';
import TimesheetsEditDialog from '../components/TimesheetsEditDialog';
import TimesheetsSettings from '../components/TimesheetsSettings';

const TimesheetsContainer = () => {
  const { getTimesheets } = useGetTimesheets();
  const [TimesheetsData, setTimesheetsData] = useState<ITimesheets[]>();
  const getTimesheetsFromApi = async () => {
    const Timesheets = await getTimesheets();
    setTimesheetsData(Timesheets.data.timesheets);
  };

  useEffect(() => {
    getTimesheetsFromApi();
  }, []);

  return (
    <TimesheetsProvider>
      <TimesheetsSettings />
      <TimesheetsTable
        Timesheets={TimesheetsData || []}
        loading={false}
        updateTable={getTimesheetsFromApi}
      />
      <TimesheetsEditDialog getTimesheetsFromApi={getTimesheetsFromApi} />
    </TimesheetsProvider>
  );
};

export default TimesheetsContainer;
