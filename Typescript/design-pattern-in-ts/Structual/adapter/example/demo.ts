import { MyAudioPlayer } from './audio-player';

const player = new MyAudioPlayer();

player.play('mp4', 'good-day.mp4');
// Playing MP4 file. Name: good-day.mp4
player.play('mp3', 'hold on.mp3');
// Playing normal Audio in mp3 format, hold on.mp3...
player.play('mkv', 'holiday.mkv');
// Playing MKV file. Name: holiday.mkv
player.play('asd', 'unknownFile');
// Unsupported format: asd
