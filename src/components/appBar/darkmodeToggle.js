import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function DarkmodeToggle() {
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <FormControl component="fieldset">
     <FormGroup aria-label="position" row>
       <FormControlLabel
         value="darkmode"
         control={
            <Switch
              color="primary"
              checked={isDark}
              onChange={event => setIsDark(event.target.checked)}
            />
          }
         label="Darkmode"
         labelPlacement="start"
       />
     </FormGroup>
   </FormControl>
  );
}

export default DarkmodeToggle;
