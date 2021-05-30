import React, { useState } from 'react';
import AvatarClip, { OnSubmitProps } from './AvatarClip';
import UploadAvatar, { ClipProps } from './UploadAvatar';

interface AvatarEditorProps {
  onSubmitFunc: (props: OnSubmitProps) => void;
  boundsColor: string;
  avatarSrc?: string;
  clip?: ClipProps;
}
export const AvatarEditor: React.FC<AvatarEditorProps> = (props) => {
  const { onSubmitFunc, avatarSrc, boundsColor, clip} = props;

  const [showEditPage, setShowEditPage] = useState(false);
  const [img, setImg] = useState<File>();
  const [imgSrc, setImgSrc] = useState('');

  const onFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if(!img) {
      return;
    }
    setImg(img);
    const fr = new FileReader();
    fr.onload = () => {
      setImgSrc(fr.result as string);
      setShowEditPage(true);
    }
    fr.readAsDataURL(img);
  }

  return (
    <>
      {
        showEditPage &&
        <AvatarClip
          onClose={() => setShowEditPage(false)} 
          img={img} 
          imgSrc={imgSrc} 
          boundsColor={boundsColor}
          onSubmitFunc={onSubmitFunc}
        />
      }
      <UploadAvatar clip={clip} avatarSrc={avatarSrc} onFileLoad={onFileLoad} />
    </>
  )
}

export default AvatarEditor;