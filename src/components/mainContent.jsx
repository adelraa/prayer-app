import Grid from '@mui/material/Unstable_Grid2';


// eslint-disable-next-line react/prop-types
export default function MainContent({city,time,nextPrayerIndex,remainingTime}) {
  const prayersArray = [
	{key: "Fajr", displayName: "الفجر" },
	{key: "Dhuhr", displayName: "الظهر" },
	{key: "Asr", displayName: "العصر" },
	{key: "Sunset", displayName: "المغرب" },
	{key: "Isha", displayName: "العشاء" },
	];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <div>
            <h2>{time}</h2>
            <h1> {city}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2> متبقي حتى صلاة{" "}
							{prayersArray[nextPrayerIndex].displayName}</h2>
            <h1> {remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
