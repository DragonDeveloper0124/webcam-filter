export const delayFrame = () => ({
  earlyUpdate: ({ ctx, size, inputs }) => {
    const input = inputs[0]
    ctx.drawImage(
      input.media,
      input.crop.x,
      input.crop.y,
      input.size,
      input.size,
      0,
      0,
      size,
      size
    )
  }
})
