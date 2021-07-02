export default async () => {
  const workbox = await window.$workbox

  if (!workbox) {
    // Workbox couldn't be loaded
    return
  }

  function eventHandler (event) {
    if (!event.isUpdate) {
      // The PWA is on the latest version
      return
    }

    alert('A new update is out!\nThe app will refresh now.')
    window.location.reload()
  }

  workbox.addEventListener('installed', eventHandler)
  workbox.addEventListener('waiting', eventHandler)
}
