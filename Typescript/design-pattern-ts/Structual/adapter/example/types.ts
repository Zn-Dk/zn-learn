// 媒体播放器 通用接口
export interface MediaPlayer {
  play(ext: string, fileName: string): void;
}

// 高级媒体播放器(视频)
export interface AdvancedMediaPlayer {
  playMkv?: (fileName: string) => void;
  playMp4?: (fileName: string) => void;
}
