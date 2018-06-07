import {h, Component} from 'composi'

export const title = new Component({
  container: 'header',
  render: (data) => {
    return (
      <nav>
        <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>composi-logo</title>
                <g id="composi-logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="composi" fill="#DF0000" fill-rule="nonzero">
                    <path d="M0,0 L12.6666667,0 L12.6666667,5.06666667 L27.8666667,5.06666667 L27.8666667,0 L40,0 L40,12.5333333 L35.3333333,12.5142888 L35.3333333,27.8666667 L40,27.8666667 L40,40 L27.8666667,40 L27.8666667,35.3333333 L12.6666667,35.3333333 L12.6666667,40 L0,40 L0,27.8666667 L5.33333333,27.8666667 L5.33333333,12.5333333 L0,12.5142888 L0,0 Z M14.2666667,14.2666667 L14.2666667,25.6 L25.6,25.6 L25.6,14.2666667 L14.2666667,14.2666667 Z" id="Combined-Shape"></path>
                  </g>
                </g>
        </svg>
        <h1>This is a dancing Pythagoras tree</h1>
      </nav>
    )
  }
})