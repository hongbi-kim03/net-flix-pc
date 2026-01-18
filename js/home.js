  /* shortform 콘텐츠 */
  function postMessageToIframe(iframe, command) {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(JSON.stringify({
  event: 'command',
  func: command,
  args: []
  }), '*');
}

const slides = document.querySelectorAll('.slide');

slides.forEach(slide => {
    const iframe = slide.querySelector('iframe');

    slide.addEventListener('mouseenter', () => {
    postMessageToIframe(iframe, 'playVideo');
    });

    slide.addEventListener('mouseleave', () => {
    postMessageToIframe(iframe, 'pauseVideo');
    });
});

window.addEventListener('load', () => {
    slides.forEach(slide => {
    const iframe = slide.querySelector('iframe');
    postMessageToIframe(iframe, 'pauseVideo');
    });
});