import React from 'react';
import { EXPERIENCES } from '../constants';

export const ExperienceRows: React.FC = () => (
  <ol className="rows">
    {EXPERIENCES.map((exp) => (
      <li className="row" key={exp.id}>
        <h3 className="row__role">{exp.role}</h3>
        <p className="row__company">{exp.company}</p>
        <p className="row__date num">
          {exp.period.replace(' - Present', ' to present').replace(' - ', ' to ')}
        </p>
        <p className="row__desc">{exp.description}</p>
      </li>
    ))}
  </ol>
);

export default ExperienceRows;
