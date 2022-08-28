import { writable } from 'svelte/store';
import { store } from './tauriStore';

// TODO: I KNOW THIS SHOULD BE A CLASS BUT I HATE THEM. (Just make it into a class fractal...)
// TODO: move this into types
const SECONDS = 1000;

type MetaSchema = {
  nowplaying: [
    {
      album: string;
      artist: string;
      duration: string;
      iTunesTrackUrl: string;
      id: number;
      imageUrl: string;
      status: string; // This seems to be an enum, find the other values
      time: Date;
      title: string;
      type: string; // This seems to be an enum, find the other values
    }
  ];
};

type AudioStore = {
  current: Partial<MetaSchema['nowplaying'][number]>;
  isPlaying: boolean;
  streamEndpoint: string;
  ready: boolean;
  audio: HTMLAudioElement;
  volume: number;
};

enum BitRate {
  HIGH = 'H',
  LOW = 'L'
}

const getStreamEndpoint = async (bitrate: BitRate) => {
  const res = await fetch(
    `https://playerservices.streamtheworld.com/api/livestream-redirect/AVTORADIOAAC_${bitrate}.aac?dist=DESKTOP`,
    {
      redirect: 'follow'
    }
  );
  res.body.cancel();

  return res.url;
};

const getCurrentlyPlaying = async (): Promise<
  | { success: true; currentlyPlaying: AudioStore['current'] }
  | { success: false }
> => {
  try {
    const res = await fetch('https://meta.metacast.eu/aim/?radio=avtoradio');
    const data = (await res.json()) as MetaSchema;
    const currentlyPlaying = data.nowplaying[0];
    return {
      success: true,
      currentlyPlaying
    };
  } catch (error) {
    return { success: false };
  }
};

const createAudioStore = () => {
  const initializationObject: AudioStore = {
    current: {},
    isPlaying: false,
    streamEndpoint: '',
    ready: false,
    audio: new Audio(),
    volume: 50
  };

  const { subscribe, set, update } = writable(initializationObject);

  const updateCurrent = async () => {
    const currentlyPlaying = await getCurrentlyPlaying();
    update(audioStore => {
      return {
        ...audioStore,
        current: currentlyPlaying.success
          ? currentlyPlaying.currentlyPlaying
          : // Check this to {} if if we want to display default on failed requests
            audioStore.current
      };
    });
  };

  setInterval(updateCurrent, 15 * SECONDS);

  return {
    subscribe,
    set: (audioStore: AudioStore) => {
      audioStore.audio.volume = audioStore.volume / 100;
      store.set('volume', audioStore.volume);
    },
    load: async () => {
      const [streamEndpoint, volume] = await Promise.all([
        getStreamEndpoint(BitRate.HIGH),
        store.get<number>('volume') // This is possibly null
      ]);

      updateCurrent();
      update(audioStore => {
        return {
          ...audioStore,
          ready: true,
          volume: volume || 50,
          audio: new Audio(streamEndpoint)
        };
      });
    },
    play: () => {
      update(audioStore => {
        audioStore.audio.load();
        audioStore.audio.play();
        return {
          ...audioStore,
          isPlaying: true
        };
      });
    },
    pause: () => {
      update(audioStore => {
        audioStore.audio.pause();
        return {
          ...audioStore,
          isPlaying: false
        };
      });
    }
  };
};

export const audioStore = createAudioStore();
