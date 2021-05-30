import { Vector2d, IRect } from "konva/types/types";

export const dragBoundFunc = (imgWidth: number, imgHeight: number, radius: number, pos: Vector2d) => {
  let x = pos.x;
  let y = pos.y;
  if(pos.x + radius > imgWidth) {
    x = imgWidth - radius;
  }
  if(pos.x - radius < 0) {
    x = radius;
  }
  if (pos.y + radius > imgHeight) {
    y = imgHeight - radius;
  }
  if (pos.y - radius < 0) {
    y = radius;
  }
  return {x,y}
}

const outOfBounds = (x: number, y: number, imgWidth: number, imgHeight: number, width: number, height: number): boolean => {
  if (
    x + width > imgWidth || 
    x < 0 ||
    y + width > imgHeight ||
    y < 0
  ) {
    return true;
  }
  return false;
}

export const boundBoxFunc = (imgWidth: number, imgHeight: number, oldBox: IRect, newBox: IRect) => {
  if (
      newBox.width <= 20 ||
      newBox.height <= 20 ||
      Math.abs(newBox.height) >= imgHeight ||
      Math.abs(newBox.width) >= imgWidth ||
      outOfBounds(Math.trunc(newBox.x), Math.trunc(newBox.y), imgWidth, imgHeight, newBox.width, newBox.height)
    ) {
    // oldBox.height = oldBox.width;
    return oldBox as any;
  }
  // newBox.width = newBox.height;
  return newBox as any;
} 