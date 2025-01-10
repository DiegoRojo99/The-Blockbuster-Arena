import React from 'react';
import './Cast.css';

const CastDisplay: React.FC<{ cast: any[] }> = ({ cast }) => {
  return (
    <div>
      {cast.length > 0 && (
        <div>
          <h2 style={{marginBottom: 0}}>Cast Members</h2>
          <div className='cast-grid'>
          {cast.map((member, index) => (
            <div className='cast-element' key={member.id} style={{ margin: '10px 0' }}>
              <img 
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} 
                alt={member.name}
                className='actor-img'
              />
              <span className='actor-name'>{member.name}</span>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default CastDisplay;
