import React from 'react';

import ClaimButton from './claimbutton/ClaimButtonContainer';

const Spectrum = ({color}) => {
  const colors = { a: 'blue', b: 'blue', o: 'blue', f: 'light-blue', g: 'yellow', m: 'magenta', k: 'orange' }
  const style = { background: colors[color[0].toLowerCase()] }
  return <div className="star-spectrum" style={style}>{color}</div>
}

const StarProfile = (props) => {
  const {star} = props;

  return(
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <div className="star-avatar pure-u-1-2">
            <img src="https://exep-archive.jpl.nasa.gov/images/soho_sun-590.jpg" alt="mock"></img>
          </div>
          <div className="star-profile pure-u-1-2">
            <p>Hi my name is { props.params.id }</p>

            <h2>Details</h2>

            <p>Name:
              <span>{star.gl}</span>
            </p>


            <div>Spectrum:
              <Spectrum color={star.spect}></Spectrum>
            </div>

            <h2>Current Ownership Status</h2>
            <p>{star.gl} is owned by
              <span>Me</span>
            </p>

            <ClaimButton starIndex={props.params.id} />

            <h2>Current Marketplace Status</h2>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StarProfile



// [{"id":119610,"hip":null,"hd":null,"hr":null,"gl":"NN 4380","bf":null,"proper":null,"ra":23.962387,
// "dec":19.770238,"dist":18.1818,"pmra":132.31,"pmdec":-461.4,"rv":0.0,"mag":13.01,"absmag":11.712,
// "spect":"m","ci":null,"x":17.109274,"y":-0.168446,"z":6.149978,"vx":1.387e-05,"vy":1.153e-05,"vz":-3.827e-05,
// "rarad":6.273338288849037,"decrad":0.3450557542719,"pmrarad":6.414569807430556e-07,"pmdecrad":-2.236954562e-06,
// "bayer":null,"flam":null,"con":null,"comp":1,"comp_primary":119610,"base":null,"lum":0.001799699516577357,"var":null,
// "var_min":null,"var_max":null},{"id":119611,"hip":null,"hd":null,"hr":null,"gl":"NN 4381","bf":null,"proper":null,
// "ra":23.963895,"dec":38.629391,"dist":16.9492,"pmra":-162.63,"pmdec":-162.63,"rv":0.0,"mag":12.64,"absmag":11.494,
// "spect":"m","ci":null,"x":13.240128,"y":-0.125297,"z":10.581054,"vx":8.22e-06,"vy":-1.344e-05,"vz":-1.044e-05,
// "rarad":6.273733165375566,"decrad":0.67421005940595,"pmrarad":-7.884524886875e-07,"pmdecrad":-7.88471881e-07,"bayer":null,
// "flam":null,"con":null,"comp":1,"comp_primary":119611,"base":null,"lum":0.002199885109049247,"var":null,"var_min":null,
// "var_max":null},