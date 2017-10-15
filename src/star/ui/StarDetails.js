import React from 'react';

import './star.css'

class StarDetails extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {details} = this.props;

    let detailsKeys = Object.keys(details) || []

    return (
     <div className="star-details">
       {
         detailsKeys.map(function (detailKey) {
          return (
            <div>
              <div className="detailKey">{detailKey}</div>
              <div className="detailValue">{details[detailKey]}</div>
            </div>
          )
         })
       }
     </div>
    )
  }
}

export default StarDetails
