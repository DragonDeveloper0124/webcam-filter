export const streak = amount => ({
  update: ({ ctx, size, inputs }) => {
    const inp = inputs[0]
    ctx.globalCompositeOperation = "screen"
    ctx.drawImage(
      inp.media,
      inp.crop.x,
      inp.crop.y,
      inp.size,
      inp.size,
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
