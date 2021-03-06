import React from 'react';
import { RULES_TITLE, RULES_DESCRIPTION_LINES } from '../constants';

export const Rules = () => (
  <div className="Rules">
    <h2 className="Rules-title">
      {RULES_TITLE}
    </h2>
    <div className="Rules-description">
      {RULES_DESCRIPTION_LINES.map( (line, index) => (
        <div className="Rules-descriptionLine">
          <div className="Rules-number">
            {index + 1}.
          </div>
          <div className="Rules-descriptionLineText">
            {line}
          </div>
        </div>
      ))}
    </div>
  </div>
)