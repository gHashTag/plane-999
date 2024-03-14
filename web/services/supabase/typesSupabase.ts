type RecordingData = {
  account_id: string;
  app_id: string;
  recording_id: string;
  room_id: string;
  room_name: string;
  session_id: string;
  metadata_id: string;
  transcription_id: string;
  metadata_timestamp: string;
  duration: number;
  summary_json_asset_id: string;
  summary_json_path: string;
  summary_json_presigned_url: string;
  transcript_json_asset_id: string;
  transcript_json_path: string;
  transcript_json_presigned_url: string;
  transcript_srt_asset_id: string;
  transcript_srt_path: string;
  transcript_srt_presigned_url: string;
  transcript_txt_asset_id: string;
  transcript_txt_path: string;
  transcript_txt_presigned_url: string;
  email: string | null;
};

export type RecordingsArray = RecordingData[];
