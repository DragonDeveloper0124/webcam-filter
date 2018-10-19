export const delayFrame = () => ({
  earlyUpdate: ({ ctx, size, inputs }) => {
    const input = inputs[0]
    const inSize = input.size || size
    ctx.drawImage(
      input.media,
      input.crop.x,
      input.crop.y,
      inSize,
      inSize,
      0,
      0,
      size,
      size
    )
  }
})
