import React, {Component} from 'react';
// import * as featuredStars from './featuredStars.json'

let config = { 
  width: 0,           // Default width, 0 = full parent element width; 
                      // height is determined by projection
  projection: "aitoff",    // Map projection used: see below
  transform: "equatorial", // Coordinate transformation: equatorial (default),
                           // ecliptic, galactic, supergalactic
  center: null,       // Initial center coordinates in set transform
                      // [longitude, latitude, orientation] all in degrees 
                      // null = default center [0,0,0]
  orientationfixed: true,  // Keep orientation angle the same as center[2]
  geopos: null,       // optional initial geographic position [lat,lon] in degrees, 
                      // overrides center
  adaptable: true,    // Sizes are increased with higher zoom-levels
  interactive: true,  // Enable zooming and rotation with mousewheel and dragging
  form: false,         // Display form for interactive settings
  location: false,    // Display location settings (no center setting on form)
  controls: true,     // Display zoom controls
  lang: "",           // Language for names, so far only for constellations: 
                      // de: german, es: spanish. Default:en or empty string for english
  container: 'map',   // ID of parent element, e.g. div, null = html-body
  datapath: "./",  // Path/URL to data files, empty = subfolder 'data'
  stars: {
    show: true,    // Show stars
    limit: 6,      // Show only stars brighter than limit magnitude
    colors: true,  // Show stars in spectral colors, if not use default color
    style: { fill: "#ffffff", opacity: 1 }, // Style for stars
    names: true,   // Show star designation (Bayer, Flamsteed, Variable star, Gliese, 
                  //  whichever applies first in that order)
    proper: false, // Show proper name (if one exists)
    desig: false,  // Show all designations, including Draper and Hipparcos
    namelimit: 2.5,  // Show only names/designations for stars brighter than namelimit
    namestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", 
                 align: "left", baseline: "top" },  // Style for star designations
    propernamestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", 
                       align: "right", baseline: "bottom" }, // Styles for star names
    propernamelimit: 1.5,  // Show proper names for stars brighter than propernamelimit
    size: 7,       // Maximum size (radius) of star circle in pixels
    exponent: -0.28, // Scale exponent for star size, larger = more linear
    data: 'featuredStars.json' // Data source for stellar data, 
                         // number indicates limit magnitude
  },
  dsos: {
    show: false,    // Show Deep Space Objects 
    limit: 6,      // Show only DSOs brighter than limit magnitude
    names: true,   // Show DSO names
    desig: true,   // Show short DSO names
    namestyle: { fill: "#cccccc", font: "11px Helvetica, Arial, serif", 
                 align: "left", baseline: "top" }, // Style for DSO names
    namelimit: 6,  // Show only names for DSOs brighter than namelimit
    size: null,    // Optional seperate scale size for DSOs, null = stars.size
    exponent: 1.4, // Scale exponent for DSO size, larger = more non-linear
    data: 'dsos.bright.json', // Data source for DSOs, 
                              // opt. number indicates limit magnitude
    symbols: {  //DSO symbol styles, 'stroke'-parameter present = outline
      gg: {shape: "circle", fill: "#ff0000"},          // Galaxy cluster
      g:  {shape: "ellipse", fill: "#ff0000"},         // Generic galaxy
      s:  {shape: "ellipse", fill: "#ff0000"},         // Spiral galaxy
      s0: {shape: "ellipse", fill: "#ff0000"},         // Lenticular galaxy
      sd: {shape: "ellipse", fill: "#ff0000"},         // Dwarf galaxy
      e:  {shape: "ellipse", fill: "#ff0000"},         // Elliptical galaxy
      i:  {shape: "ellipse", fill: "#ff0000"},         // Irregular galaxy
      oc: {shape: "circle", fill: "#ffcc00", 
           stroke: "#ffcc00", width: 1.5},             // Open cluster
      gc: {shape: "circle", fill: "#ff9900"},          // Globular cluster
      en: {shape: "square", fill: "#ff00cc"},          // Emission nebula
      bn: {shape: "square", fill: "#ff00cc", 
           stroke: "#ff00cc", width: 2},               // Generic bright nebula
      sfr:{shape: "square", fill: "#cc00ff", 
           stroke: "#cc00ff", width: 2},               // Star forming region
      rn: {shape: "square", fill: "#00ooff"},          // Reflection nebula
      pn: {shape: "diamond", fill: "#00cccc"},         // Planetary nebula 
      snr:{shape: "diamond", fill: "#ff00cc"},         // Supernova remnant
      dn: {shape: "square", fill: "#999999", 
           stroke: "#999999", width: 2},               // Dark nebula grey
      pos:{shape: "marker", fill: "#cccccc", 
           stroke: "#cccccc", width: 1.5}              // Generic marker
    }
  },
  planets: {  //Show planet locations, if date-time is set
    show: false,
    // List of all objects to show
    which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
    // Font styles for planetary symbols
    style: { fill: "#00ccff", font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif", 
             align: "center", baseline: "middle" },
    symbols: {  // Character and color for each symbol in 'which', simple circle \u25cf
      "sol": {symbol: "\u2609", fill: "#ffff00"},
      "mer": {symbol: "\u263f", fill: "#cccccc"},
      "ven": {symbol: "\u2640", fill: "#eeeecc"},
      "ter": {symbol: "\u2295", fill: "#00ffff"},
      "lun": {symbol: "\u25cf", fill: "#ffffff"}, // overridden by generated cresent
      "mar": {symbol: "\u2642", fill: "#ff9999"},
      "cer": {symbol: "\u26b3", fill: "#cccccc"},
      "ves": {symbol: "\u26b6", fill: "#cccccc"},
      "jup": {symbol: "\u2643", fill: "#ff9966"},
      "sat": {symbol: "\u2644", fill: "#ffcc66"},
      "ura": {symbol: "\u2645", fill: "#66ccff"},
      "nep": {symbol: "\u2646", fill: "#6666ff"},
      "plu": {symbol: "\u2647", fill: "#aaaaaa"},
      "eri": {symbol: "\u25cf", fill: "#eeeeee"}
    }
  },
  constellations: {
    show: false,    // Show constellations 
    names: true,   // Show constellation names 
    desig: true,   // Show short constellation names (3 letter designations)
    namestyle: { fill:"#cccc99", align: "center", baseline: "middle", 
                 font: ["14px Helvetica, Arial, sans-serif",  // Style for constellations
                        "12px Helvetica, Arial, sans-serif",  // Different fonts for diff.
                        "11px Helvetica, Arial, sans-serif"]},// ranked constellations
    lines: true,   // Show constellation lines, style below
    linestyle: { stroke: "#cccccc", width: 1, opacity: 0.6 }, 
    bounds: false, // Show constellation boundaries, style below
    boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
  },  
  mw: {
    show: true,     // Show Milky Way as filled multi-polygon outlines 
    style: { fill: "#ffffff", opacity: 0.15 }  // Style for MW layers
  },
  lines: {  // Display & styles for graticule & some planes
    graticule: { show: false, stroke: "#cccccc", width: 0.6, opacity: 0.8,   
      // grid values: "outline", "center", or [lat,...] specific position
      lon: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}, 
      // grid values: "outline", "center", or [lon,...] specific position
      lat: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}},    
    equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },  
    ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },     
    galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },    
    supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
  },
  background: {        // Background style
    fill: "#000000",   // Area fill
    opacity: 1, 
    stroke: "#000000", // Outline
    width: 1.5
  }, 
  horizon: {  //Show horizon marker, if location is set and map projection is all-sky
    show: false, 
    stroke: "#000099", // Line
    width: 1.0, 
    fill: "#000000",   // Area below horizon
    opacity: 0.5
  }
};


class Stars extends Component {
  componentDidMount() {
    window.Celestial.display(config)
  }
  render(){
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className="stars">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Stars
