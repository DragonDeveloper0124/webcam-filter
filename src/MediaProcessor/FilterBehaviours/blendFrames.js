export const blendFrames = blendMode => ({
  update: ({ ctx, size, inputs }) => {
    ctx.clearRect(0, 0, size, size)
    ctx.globalCompositeOperation = blendMode
    for (let i = 0; i < inputs.length; i++) {
      const inp = inputs[i]
      const inSize = inp.size || size
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
    }
  }
})
