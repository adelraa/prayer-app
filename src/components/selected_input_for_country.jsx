
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './prayer.css';

// eslint-disable-next-line react/prop-types
export default function BasicSelectCountry({onChange}) {
 

  const avilableCountry = [
		{
			displayName: "مصر",
			apiName: "EG",
		},
		{
			displayName: "السعودية",
			apiName: "SA",
		},
		{
			displayName: "عمان",
			apiName: "OM",
		},
	];

  return (
    <Box sx={{ minWidth: 200,color:"white" }}>
      <FormControl style={{width:"100%",}} >
        <InputLabel id="demo-simple-select-label" className='inputlabel'>الدولة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          label="مصر"
          onChange={onChange}
        >
          {avilableCountry.map((Country) => {
							return (
								<MenuItem
									value={Country.apiName}
									key={Country.apiName}
								>
									{Country.displayName}
								</MenuItem>
							);
						})}
        </Select>
      </FormControl>
    </Box>
  );
}