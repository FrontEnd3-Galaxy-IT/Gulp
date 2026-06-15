export class VideoResponser {
  constructor(selector) {
    const $video = document.querySelector(selector)
    this.options = {
      selector,
      breakpoints: {
        default: {
          src: $video.getAttribute("data-src"),
          mp4: $video.getAttribute("data-mp4") || null,
          mov: $video.getAttribute("data-mov") || null,
          webm: $video.getAttribute("data-webm") || null,
        },
      },
    }

    // get a list of video switching points and links to the videos themselves
    $video.querySelectorAll("[data-src]").forEach(
      (element) =>
        (this.options.breakpoints[element.getAttribute("data-mw")] = {
          src: element.getAttribute("data-src"),
          mp4: element.getAttribute("data-mp4") || null,
          mov: element.getAttribute("data-mov") || null,
          webm: element.getAttribute("data-webm") || null,
        }),
    )
    $video.innerHTML = "" // we clean up so that there is nothing superfluous

    // run the handler and track the change in screen width
    this.responseVideo(this.options)
    this.resizer()
  }

  /** Function runs on resize  */
  resizer() {
    window.addEventListener("resize", () => this.responseVideo(this.options))
  }

  /**
   * Change src value of video link to fit screen width
   * @param {Object} options object with options
   */
  responseVideo(options) {
    const { selector, breakpoints } = options // get options
    let $video = document.querySelector(selector)
    const widthNow = $video.getAttribute("data-width-now") || null
    const maxBreakpoint = Math.max.apply(
      Math,
      Object.keys(breakpoints)
        .filter((key) => key <= document.body.clientWidth)
        .map(Number),
    )
    const nowBreakpoint = maxBreakpoint || "default" // choose either the maximum value, if not, then the default

    if (widthNow && widthNow == nowBreakpoint) return // check if the video needs to be changed

    $video.setAttribute("data-width-now", nowBreakpoint)
    if (breakpoints[nowBreakpoint].mp4 || breakpoints[nowBreakpoint].mov || breakpoints[nowBreakpoint].webm) {
      $video.innerHTML = ""

      if (breakpoints[nowBreakpoint].webm) {
        $video.innerHTML += "<source src=\"" + breakpoints[nowBreakpoint].webm + "\" type=\"video/webm\">"
      }
      if (breakpoints[nowBreakpoint].mp4) {
        $video.innerHTML += "<source src=\"" + breakpoints[nowBreakpoint].mp4 + "\" type=\"video/mp4\">"
      }
      if (breakpoints[nowBreakpoint].mov) {
        $video.innerHTML += "<source src=\"" + breakpoints[nowBreakpoint].mov + "\" type=\"video/mp4\">"
      }
    } else {
      $video.innerHTML = ""
      $video.src = breakpoints[nowBreakpoint].src
    }

    $video.play()
  }
}

// document.getElementById("response_video") && new VideoResponser("#response_video")

// <video class="home_video" id="response_video" autoplay loop muted playsinline
//        data-src="static/video/home.mp4">
//   <source
//       data-src="static/video/home.mp4"
//       data-mp4="static/video/home.mp4"
//       data-mov="static/video/home.mov"
//       data-webm="static/video/home.webm"
//       type="video/mp4"
//       data-mw="320">
//     <source
//         data-src="static/video/home.mp4"
//         data-mp4="static/video/home.mp4"
//         data-mov="static/video/home.mov"
//         data-webm="static/video/home.webm"
//         type="video/mp4"
//         data-mw="1024">
// </video>
