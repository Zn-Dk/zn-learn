import { AdvancedMediaPlayer } from './types';

export class MP4Player implements AdvancedMediaPlayer {
  playMp4(fileName: string) {
    console.log(`Playing MP4 file. Name: ${fileName}`);
  }
}

export class MKVPlayer implements AdvancedMediaPlayer {
  playMkv(fileName: string) {
    console.log(`Playing MKV file. Name: ${fileName}`);
  }
}
