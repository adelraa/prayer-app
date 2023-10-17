import './App.css'
import MainContent from './components/mainContent'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import PrayerCard from './components/PrayerCard'
import BasicSelect from './components/selectInput';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BasicSelectCountry from './components/selected_input_for_country'
import moment from 'moment';
import"moment/dist/locale/ar";
moment.locale("ar")


function App() {

	const [nextPrayerIndex, setNextPrayerIndex] = useState(2)
	const [remainingTime, setRemainingTime] = useState("");
  const [timings, setTimings] = useState({
    Fajr: "6:55",
    Dhuhr: "1:7",
    Asr: "1:7",
    Sunset: "1:7",
    Isha: "1:7",
  });
  const [selectedCity, setSelectedCity] = useState({
		displayName: "مكة المكرمة",
		apiName: "Makkah al Mukarramah",
	});
  const [selectedCountry, setSelectedCountry] = useState({
		displayName: "مصر",
		apiName: "EG",
	});
  const [today, setToday] = useState("");
  
 

  const avilableCities = [
		{
			displayName: "مكة المكرمة",
			apiName: "Makkah al Mukarramah",
		},
		{
			displayName: "الرياض",
			apiName: "Riyadh",
		},
		{
			displayName: "مصر",
			apiName: "Cairo",
		},
	];

  const avilableCountry = [
		{
			displayName: "مصر",
			apiName: "EG",
		},
		{
			displayName: "السعودية",
			apiName: "EG",
		},
		{
			displayName: "عمان",
			apiName: "OM",
		},
	];
	const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];

  const getTimings = async () => {
    console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${selectedCountry.apiName}&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };



  
  useEffect(() => {
    getTimings();
	const t =moment();
	setToday(t.format("MMM Do YYYY | h:mm"))
  }, [selectedCity]);


  useEffect(() => {
	let interval = setInterval(() => {
		console.log("calling timer");
		setupCountdownTimer();
	}, 1000);

	return () => {
		clearInterval(interval);
	};
}, [timings]);





const setupCountdownTimer = () => {
	const momentNow = moment();

	let prayerIndex = 2;

	if (
		momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
		momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
	) {
		prayerIndex = 1;
	} else if (
		momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
		momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
	) {
		prayerIndex = 2;
	} else if (
		momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
		momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
	) {
		prayerIndex = 3;
	} else if (
		momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
		momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
	) {
		prayerIndex = 4;
	} else {
		prayerIndex = 0;
	}

	setNextPrayerIndex(prayerIndex);

	// now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
	const nextPrayerObject = prayersArray[prayerIndex];
	const nextPrayerTime = timings[nextPrayerObject.key];
	const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

	let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

	if (remainingTime < 0) {
		const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
		const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
			moment("00:00:00", "hh:mm:ss")
		);

		const totalDiffernce = midnightDiff + fajrToMidnightDiff;

		remainingTime = totalDiffernce;
	}
	console.log(remainingTime);

	const durationRemainingTime = moment.duration(remainingTime);

	setRemainingTime(
		`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
	);
	console.log(
		"duration issss ",
		durationRemainingTime.hours(),
		durationRemainingTime.minutes(),
		durationRemainingTime.seconds()
	);
};





  const handleCityChange = (event) => {
		const cityObject = avilableCities.find((city) => {
			return city.apiName == event.target.value;
		});
		console.log("the new value is ", event.target.value);
		setSelectedCity(cityObject);
	};



  const handleCountryChange = (event) => {
		const CountryObject = avilableCountry.find((Country) => {
			return Country.apiName == event.target.value;
		});
		console.log("the new value is ", event.target.value);
		setSelectedCountry(CountryObject);
	};



  return (
    <div style={{display:"flex" , justifyContent:"center",width:"100vw"}}>
        <Container maxWidth="xl">
              <MainContent city={selectedCity.displayName} time={today} nextPrayerIndex={nextPrayerIndex} remainingTime={remainingTime} />
              <Divider variant="middle" style={{borderColor:"white",opacity:"0.1"}} />
              <Stack direction="row"  justifyContent={"space-around"} marginTop={"25px"}>
              <PrayerCard name='الفجر' time= {timings.Fajr} image="./fajr-prayer.png"/>
              <PrayerCard name='الظهر' time={timings.Dhuhr} image="./dhhr-prayer-mosque.png"/>
              <PrayerCard name='العصر' time={timings.Asr} image="./asr-prayer-mosque.png"/>
              <PrayerCard name='المغرب' time={timings.Sunset} image="./sunset-prayer-mosque.png"/>
              <PrayerCard name='العشاء' time={timings.Isha} image="./night-prayer-mosque.png"/>
              </Stack>
              <Stack direction="row"  justifyContent={"center"} marginTop={"40px"}>
               <BasicSelect onChange={handleCityChange}></BasicSelect>
               <BasicSelectCountry onChange={handleCountryChange}/>
              </Stack>
        </Container>
    </div>
  )
}

export default App
