import { MKVPlayer, MP4Player } from './advance-media-players';
import { AdvancedMediaPlayer, MediaPlayer } from './types';

// 适配器模式
// 1- 实现最基本的 play 方法
// 2- 根据格式调用不同的高级播放器
export class AdvanceMediaAdapter implements MediaPlayer {
  advancedMediaPlayer!: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === 'mkv') {
      this.advancedMediaPlayer = new MKVPlayer();
    }
    if (audioType === 'mp4') {
      this.advancedMediaPlayer = new MP4Player();
    }
  }

  play(audioType: string, fileName: string) {
    if (audioType === 'mkv') {
      this.advancedMediaPlayer.playMkv?.(fileName);
    }
    if (audioType === 'mp4') {
      this.advancedMediaPlayer.playMp4?.(fileName);
    }
  }
}
