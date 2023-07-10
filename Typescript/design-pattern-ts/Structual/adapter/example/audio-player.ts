import { AdvanceMediaAdapter } from './adapter';
import { MediaPlayer } from './types';

// 原始的音乐播放器
// 希望实现高级格式播放
export class MyAudioPlayer implements MediaPlayer {
  static supportedFormats = ['mp3', , 'ape', 'flac', 'wav'];
  static supportedAdvancedFormats = ['mp4', 'mkv'];

  play(audioType: string, fileName: string) {
    try {
      // 检查格式
      this.checkFormat(audioType);

      if (this.isAudio(audioType)) {
        console.log(`Playing normal Audio in ${audioType} format, ${fileName}...`);
      }
      // 高级格式 调用转接器
      if (this.isAdvancedAudio(audioType)) {
        const adapter = new AdvanceMediaAdapter(audioType);
        adapter.play(audioType, fileName);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private isAudio(audioType: string) {
    return MyAudioPlayer.supportedFormats.includes(audioType);
  }

  private isAdvancedAudio(audioType: string) {
    return MyAudioPlayer.supportedAdvancedFormats.includes(audioType);
  }

  private checkFormat(audioType: string) {
    if (!this.isAudio(audioType) && !this.isAdvancedAudio(audioType)) {
      throw new Error(this.handleError(audioType));
    }
    return true;
  }

  private handleError(audioType: string) {
    return `Unsupported format: ${audioType}`;
  }
}
