
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './prayer.css';

// eslint-disable-next-line react/prop-types
export default function BasicSelect({onChange}) {
 

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
			displayName: "القاهرة",
			apiName: "Cairo",
		},
	];
  return (
    <Box sx={{ minWidth: 200,color:"white"}} style={{marginLeft:"15"}}>
      <FormControl style={{width:"100%"   }} >
        <InputLabel id="demo-simple-select-label" className='inputlabel'>المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          label="Age"
          onChange={onChange}
        >
          {avilableCities.map((city) => {
							return (
								<MenuItem
									value={city.apiName}
									key={city.apiName}
								>
									{city.displayName}
								</MenuItem>
							);
						})}
        </Select>
      </FormControl>
    </Box>
  );
}