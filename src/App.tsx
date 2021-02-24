import React, { useState } from "react";
import Sound from "react-sound";
import "./App.scss";

interface Idog {
  name: string;
  soundUrl: string;
  color: string;
}

enum EPlayStatus {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
}

interface AudioCardProps {
  dog: Idog;
}

const dogs: Idog[] = [
  {
    name: "Luna",
    soundUrl: require("./assets/luna.mp3").default,
    color: "pink",
  },
  {
    name: "Lilo",
    soundUrl: require("./assets/lilo.mp3").default,
    color: "brown",
  },
  {
    name: "Chihiro",
    soundUrl: require("./assets/chihiro.mp3").default,
    color: "blue",
  },
  {
    name: "Lily",
    soundUrl: require("./assets/lily.mp3").default,
    color: "purple",
  },
];

const AudioCard = ({ dog }: AudioCardProps) => {
  const [play, setPlay] = useState<EPlayStatus>(EPlayStatus.STOPPED);

  const handleCardClick = () => {
    switch (play) {
      case EPlayStatus.STOPPED:
        setPlay(EPlayStatus.PLAYING);
        break;
      case EPlayStatus.PLAYING:
        setPlay(EPlayStatus.STOPPED);
        break;
    }
  };

  return (
    <button
      className={`audio-card ${
        play === EPlayStatus.PLAYING ? `audio-card--${dog.color}` : ""
      }`}
      onClick={handleCardClick}
      onBlur={() => setPlay(EPlayStatus.STOPPED)}
    >
      <h2 className="card-title">{dog.name}</h2>
      <Sound
        url={dog.soundUrl}
        playStatus={play}
        onFinishedPlaying={() => setPlay(EPlayStatus.STOPPED)}
        loop
      />
    </button>
  );
};

const App = () => {
  return (
    <div className="container">
      <h1 className="header">Dog Caller</h1>
      <div className="card-container">
        {dogs.map((dog) => (
          <AudioCard dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default App;
