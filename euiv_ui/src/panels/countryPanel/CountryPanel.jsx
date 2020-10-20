import React from 'react';

import './style.scss';

function CountryPanel() {
  return (
    <div className="countryPanel">
      <div className="titularSection">
        
      </div>
      <div className="terrainSection">

      </div>
      <div className="developmentSection">

      </div>
      <div className="focusSection">
        <div className="stabilitySection">
          <div className="devastation">
            <i>dev</i>
            <span className="type">0.00%</span>
          </div>
          <div className="loot">
            <i>loot</i>
            <span className="progressBar">---</span>
          </div>
          <ul>
            <li>
              <span>Tax</span>
              <span>0.24</span>
            </li>
            <li>
              <span>Production</span>
              <span>0.08</span>
            </li>
            <li>
              <span>Total</span>
              <span>0.33</span>
            </li>
          </ul>

          <div className="Unrest">
            <div className="display">
              <span>Unrest</span>
              <span>0.0</span>
            </div>
            <i>reb</i>
          </div>

          <div className="Authonomy">
            <div className="display">
              <span>Authonomy</span>
              <span>0.0%</span>
            </div>
            <div className="buttons">
              <i>-</i>
              <i>+</i>
            </div>
          </div>
        </div>

        <div className="demographicsSection">
          <span>Demographics</span>

          <div className="cores">
            <span>Core & Claims</span>
            <div className="display">
              <div className="statesList"></div>
              <button>COR</button>
            </div>
          </div>

          <div className="culture">
            <div className="display">
                <span>Culture</span>
                <span className="type">Portuguese</span>
            </div>
            <button>CUL</button>
          </div>

          <div className="religion">
            <div className="display">
              <span>Religion</span>
              <span className="type">Catholic</span>
            </div>
            <button>REL</button>
          </div>

        </div>

        <div className="militaryProductionSection">
          <span>Queue</span>

        </div>
      </div>
      <div className="adminSection">

      </div>
      <div className="militarySection">
        <span>Military</span>
          <ul>
            <li>
              <span>Manpower</span>
              <span>500</span>
            </li>
            <li>
              <span>Supply Limit</span>
              <span>19</span>
            </li>
            <li>
              <span>Sailors</span>
              <span>0</span>
            </li>
          </ul>
          <div className="warScore">

          </div>
      </div>
      <div className="tradeSection">
        <span>Trade</span>
          <ul>
            <li>
              <span>Trade Power</span>
              <span>1.6</span>
            </li>
            <li>
              <span>Trade Value</span>
              <span>1.00</span>
            </li>
            <li>
              <span>Godds Produced</span>
              <span>0.40</span>
            </li>
          </ul>
      </div>
    </div>
  );
}

export default CountryPanel;
