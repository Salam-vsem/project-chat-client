import { Message, MessageType } from "../../../types";
import axios from 'axios';
const fileDownload = require('js-file-download');

export const calcShowAvatar = (curr: Message, prev: Message): boolean => {
  if(!prev || !curr) {
    return true;
  }
  return (new Date(curr.date - prev.date).getMinutes() > 10 || prev.userId !== curr.userId);
}

export const formMessageBorder = (radius: number, personal?: boolean) => (
  personal?
      (`${radius}px ${radius}px 0px ${radius}px`):
      (`${radius}px ${radius}px ${radius}px 0px`)
)

export const formImageMessageBorder = (radius: number) => (
  (`${radius}px ${radius}px 0px 0px`)
)

export const downloadFile = async (url: string, fileName: string, onDownloadProgress: (progressEvent: ProgressEvent<EventTarget>) => void) => {
  const res = await axios.get(url, {
    onDownloadProgress,
    responseType: "blob"
  })
  const data = res.data;
  fileDownload(data, fileName)
}

export const isFileList = (data: Object): data is FileList => 'item' in data

export const uploadFile = async (data: File | FileList, path: string, afterUpload: (res: any) => void) => {
  if(!data) {
    return;
  }
  const files = isFileList(data) ? data : [(data as File)]
    try {
      const formData = new FormData();
      for(let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
      const res = await axios.post(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((data) => data.data);
      afterUpload(res)
    }catch(e) {
      alert('ошибка сохранения');
    }
}