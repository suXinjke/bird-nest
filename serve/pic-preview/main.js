window.addEventListener('DOMContentLoaded', () => {
  upload.onchange = function (e) {
    pic.src = URL.createObjectURL(e.target.files[0])
  }
})
