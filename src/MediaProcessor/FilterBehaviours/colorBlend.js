export const colorBlend = color => ({
  update: ({ ctx, size, inputs }) => {
    const input = inputs[0]
    const inSize = input.size || size
    ctx.globalCompositeOperation = "source-over"
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
    ctx.globalCompositeOperation = "difference"
    ctx.fillStyle = color
    ctx.fillRect(0, 0, size, size)
  },
  earlyUpdate: null
})
