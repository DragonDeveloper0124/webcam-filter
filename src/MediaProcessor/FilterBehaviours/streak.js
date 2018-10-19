export const streak = amount => ({
  update: ({ ctx, size, inputs }) => {
    const inp = inputs[0]
    const inSize = inp.size || size
    ctx.globalCompositeOperation = "screen"
    ctx.drawImage(
      inp.media,
      inp.crop.x,
      inp.crop.y,
      inSize,
      inSize,
      0,
      0,
      size,
      size
    )
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = `rgba(0,0,0,${amount})`
    ctx.fillRect(0, 0, size, size)
  },
  earlyUpdate: null
})
