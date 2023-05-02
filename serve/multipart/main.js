window.addEventListener('DOMContentLoaded', () => {
  jsForm.onsubmit = function (e) {
    e.preventDefault()

    // Way 1
    // const formData = new FormData(jsForm)

    // Way 2
    const formData = new FormData()
    formData.set('pic', e.target.pic.files[0])

    fetch('http://localhost:3000/file', {
      method: 'POST',

      body: formData,
    })
  }
})
