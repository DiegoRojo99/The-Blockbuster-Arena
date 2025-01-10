import React from "react";

interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

interface ActorDisplayProps {
  actor: Actor | undefined;
}

const ActorDisplay: React.FC<ActorDisplayProps> = ({ actor }) => {
  if(!actor){
    return <></>
  }
  return (
    <div className="grid-cell actor-cell" key={actor.id}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
        alt={actor.name}
        className="actor-image"
      />
      <span>{actor.name}</span>
    </div>
  );
};

export default ActorDisplay;
